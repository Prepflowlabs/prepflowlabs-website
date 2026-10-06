/** @format */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { FaCheck, FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import { apiRequest } from "../../../utils/api/apiRequest";
import LoadingWheel from "../../../components/LoadingWheel";
import { GLASS_CARD, Halo } from "../../../components/pricing/PlanCards";
import OnboardLayout from "./components/OnboardLayout";

type Phase = "not_paid" | "starting" | "building" | "dns" | "live" | "issue";
type StepState = "done" | "current" | "upcoming";

interface SetupStep {
    label: string;
    state: StepState;
}

interface DnsRecord {
    type: string;
    name: string;
    value: string;
    purpose?: string;
    priority?: number;
    record?: string;
}

interface DnsGroup {
    purpose: string;
    verified: boolean;
}

interface SetupProgress {
    phase: Phase;
    steps: SetupStep[];
    dns_records?: DnsRecord[];
    dns_groups?: DnsGroup[];
    dashboard_url?: string;
}

// Only these phases change on their own; live and issue are final.
const POLL_MS: Partial<Record<Phase, number>> = {
    starting: 5000,
    building: 5000,
    dns: 30000,
};
const RETRY_MS = 10000;

const HEADINGS: Record<Exclude<Phase, "not_paid">, { title: string; body: string }> = {
    starting: {
        title: "Setting up your dashboard",
        body: "This usually takes a few minutes. You can keep this page open to watch its progress.",
    },
    building: {
        title: "Setting up your dashboard",
        body: "This usually takes a few minutes. You can keep this page open to watch its progress.",
    },
    dns: {
        title: "Connect your domain",
        body: "Your dashboard is built. Add the DNS records below at your domain provider to put it on your own domain.",
    },
    live: {
        title: "Your dashboard is live",
        body: "Everything is connected. Sign in with the email and password you created.",
    },
    issue: {
        title: "We ran into a problem",
        body: "Something went wrong while setting up your dashboard. Our team has been notified and will reach out to you shortly.",
    },
};

const PURPOSE_COPY: Record<string, string> = {
    API: "Connects your dashboard to its server.",
    Dashboard: "Puts your dashboard on your domain.",
    Docs: "Hosts your help center.",
    Email: "Lets notification emails send from your domain.",
};

export function CopyButton({ textToCopy }: { textToCopy: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            title="Copy"
            onClick={copy}
            className="shrink-0 cursor-pointer px-1 text-slate-400 hover:text-slate-700"
        >
            {copied ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
                <ClipboardDocumentIcon className="h-4 w-4" />
            )}
        </button>
    );
}

function StepIcon({ state, issue }: { state: StepState; issue: boolean }) {
    if (state === "done") {
        return (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent shadow-[0_0_10px_rgba(195,55,100,0.45)]">
                <FaCheck size={9} className="text-white" />
            </span>
        );
    }
    if (state === "current") {
        return issue ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                !
            </span>
        ) : (
            <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        );
    }
    return <span className="h-5 w-5 shrink-0 rounded-full border-2 border-slate-200" />;
}

function RecordGroup({
    purpose,
    verified,
    records,
}: {
    purpose: string;
    verified: boolean;
    records: DnsRecord[];
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/70">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <div>
                    <p className="font-semibold text-[#182145]">{purpose}</p>
                    {PURPOSE_COPY[purpose] && (
                        <p className="text-xs text-slate-500">{PURPOSE_COPY[purpose]}</p>
                    )}
                </div>
                <span
                    className={clsx(
                        "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
                        verified ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700",
                    )}
                >
                    {verified ? "Verified" : "Waiting"}
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="text-xs uppercase text-slate-500">
                        <tr>
                            <th className="px-4 py-2 font-medium">Type</th>
                            <th className="px-4 py-2 font-medium">Name</th>
                            <th className="px-4 py-2 font-medium">Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {records.map((record, index) => (
                            <tr key={`${record.type}-${record.name}-${index}`} className="align-top">
                                <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-700">
                                    {record.type}
                                    {record.priority != null && (
                                        <span className="block text-xs font-normal text-slate-400">
                                            Priority {record.priority}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2.5">
                                    <div className="flex items-start gap-1">
                                        <code className="break-all text-slate-700">{record.name}</code>
                                        <CopyButton textToCopy={record.name} />
                                    </div>
                                </td>
                                <td className="px-4 py-2.5">
                                    <div className="flex items-start gap-1">
                                        <code className="break-all text-slate-700">{record.value}</code>
                                        <CopyButton textToCopy={record.value} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/** Sign-up step 4. After payment the provisioner builds the dashboard; this
 *  polls GET /core/tenants/:tenant/setup-progress, which only exposes generic
 *  steps, the DNS records and (once live) the dashboard link. */
export default function SetupDomain() {
    const { tenant } = useParams();
    const navigate = useNavigate();
    const [progress, setProgress] = useState<SetupProgress | null>(null);
    const loadedOnce = useRef(false);

    useEffect(() => {
        let cancelled = false;
        let timer: ReturnType<typeof setTimeout> | undefined;

        const load = async () => {
            const res = await apiRequest(`/core/tenants/${tenant}/setup-progress`);
            if (cancelled) return;
            if (res?.status !== "success") {
                if (!loadedOnce.current) {
                    navigate("/not-found");
                    return;
                }
                // A blip while polling: keep what's on screen and try again.
                timer = setTimeout(load, RETRY_MS);
                return;
            }
            const data = res.data as SetupProgress;
            if (data.phase === "not_paid") {
                navigate(`/prepcenter/onboard/${tenant}/billing`, { replace: true });
                return;
            }
            loadedOnce.current = true;
            setProgress(data);
            const wait = POLL_MS[data.phase];
            if (wait) timer = setTimeout(load, wait);
        };

        load();
        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
        };
    }, [tenant, navigate]);

    const phase = progress?.phase;
    const heading = phase && phase !== "not_paid" ? HEADINGS[phase] : null;
    const records = progress?.dns_records ?? [];
    const groups: DnsGroup[] =
        progress?.dns_groups && progress.dns_groups.length > 0
            ? progress.dns_groups
            : [...new Set(records.map((r) => r.purpose ?? "Other"))].map((purpose) => ({
                  purpose,
                  verified: false,
              }));
    const showRecords = phase === "dns" && records.length > 0;

    return (
        <OnboardLayout step={4}>
            {!progress || !heading ? (
                <div className="flex justify-center pt-32">
                    <LoadingWheel />
                </div>
            ) : (
                <div className="mx-auto max-w-2xl space-y-6">
                    <section className={`${GLASS_CARD} p-6 sm:p-10`}>
                        <Halo />
                        <div className="relative">
                            <h1 className="text-2xl font-semibold tracking-tight text-[#182145]">
                                {heading.title}
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">{heading.body}</p>

                            <ol className="mt-8 space-y-4">
                                {progress.steps.map((step) => (
                                    <li key={step.label} className="flex items-center gap-3">
                                        <StepIcon state={step.state} issue={phase === "issue"} />
                                        <span
                                            className={clsx(
                                                "text-sm",
                                                step.state === "upcoming"
                                                    ? "text-slate-400"
                                                    : "font-medium text-[#182145]",
                                            )}
                                        >
                                            {step.label}
                                        </span>
                                    </li>
                                ))}
                            </ol>

                            {phase === "live" && progress.dashboard_url && (
                                <a
                                    href={progress.dashboard_url}
                                    className="mt-8 inline-flex items-center justify-center gap-x-2 rounded-xl bg-[linear-gradient(60deg,#C33764,#302B63)] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                                >
                                    <span>Go to your dashboard</span>
                                    <FaChevronRight size={12} />
                                </a>
                            )}
                        </div>
                    </section>

                    {showRecords && (
                        <section className="rounded-[20px] border border-white/80 bg-white/85 p-6 shadow-[0_24px_60px_-20px_rgba(24,33,69,0.25)] ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-10">
                            <h2 className="text-lg font-semibold text-[#182145]">DNS records</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Add these records at your domain provider (for
                                example Namecheap, GoDaddy or Cloudflare). We check
                                them automatically. It can take up to 24 to 48
                                hours after you add them, and we'll email you as
                                soon as your dashboard is live.
                            </p>
                            <div className="mt-6 space-y-4">
                                {groups.map((group) => (
                                    <RecordGroup
                                        key={group.purpose}
                                        purpose={group.purpose}
                                        verified={group.verified}
                                        records={records.filter(
                                            (r) => (r.purpose ?? "Other") === group.purpose,
                                        )}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </OnboardLayout>
    );
}
