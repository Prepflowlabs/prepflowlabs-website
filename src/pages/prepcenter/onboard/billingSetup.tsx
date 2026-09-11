/** @format */

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaCheck, FaChevronRight } from "react-icons/fa";
import { apiRequest } from "../../../utils/api/apiRequest";
import LoadingWheel from "../../../components/LoadingWheel";
import { GLASS_CARD, Halo } from "../../../components/pricing/PlanCards";
import EmbeddedCheckout from "../../../components/pricing/EmbeddedCheckout";
import {
    BOXEM_TERMS_URL,
    PLAN,
    formatUsd,
    parseInterval,
    type BillingInterval,
} from "../../../components/pricing/plan";
import OnboardLayout from "./components/OnboardLayout";

interface PublicBilling {
    company_name: string;
    billing_interval: BillingInterval | null;
    email_verified: boolean;
    signup_complete: boolean;
}

type Phase =
    | "loading"
    | "paying"
    | "charging"
    | "done"
    | "processing"
    | "already_done";

const POLL_INTERVAL_MS = 3000;
const POLL_ATTEMPTS = 20;

function DonePanel({
    title,
    children,
    continueHref,
}: {
    title: string;
    children: string;
    continueHref?: string;
}) {
    return (
        <div className={`${GLASS_CARD} mx-auto max-w-lg p-10 text-center`}>
            <Halo />
            <div className="relative flex flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-[0_0_24px_rgba(195,55,100,0.45)]">
                    <FaCheck size={20} className="text-white" />
                </span>
                <h1 className="mt-6 text-2xl font-semibold text-[#182145]">
                    {title}
                </h1>
                <p className="mt-3 text-sm/6">{children}</p>
                {continueHref && (
                    <a
                        href={continueHref}
                        className="mt-8 inline-flex items-center justify-center gap-x-2 rounded-xl bg-[linear-gradient(60deg,#C33764,#302B63)] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                    >
                        <span>Continue to domain setup</span>
                        <FaChevronRight size={12} />
                    </a>
                )}
            </div>
        </div>
    );
}

/** Sign-up payment step. The plan was picked on /pricing and arrives as
 *  ?interval= (or is resumed from what was saved); to change it, people go
 *  back via the "Plan" step. Saving the card is followed by the first charge
 *  (POST /billing/complete, which bills through the Boxem proxy). The email
 *  must be verified first, so unverified visitors go back to /verify. */
export default function BillingSetup() {
    const { tenant } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [phase, setPhase] = useState<Phase>("loading");
    const [billing, setBilling] = useState<PublicBilling | null>(null);
    const [interval, setBillingInterval] = useState<BillingInterval>(
        parseInterval(searchParams.get("interval")) ?? "monthly",
    );
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    // Bumped to (re)mount the checkout; 0 = not started.
    const [checkoutKey, setCheckoutKey] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const alive = useRef(true);

    useEffect(() => {
        alive.current = true;
        return () => {
            alive.current = false;
        };
    }, []);

    useEffect(() => {
        const load = async () => {
            const res = await apiRequest(`/core/tenants/${tenant}/billing`);
            if (res?.status !== "success") {
                navigate("/not-found");
                return;
            }
            const data = res.data as PublicBilling;
            if (data.signup_complete) {
                setBilling(data);
                setPhase("already_done");
                return;
            }
            if (!data.email_verified) {
                const query = searchParams.toString();
                navigate(
                    `/prepcenter/onboard/${tenant}/verify${query ? `?${query}` : ""}`,
                    { replace: true },
                );
                return;
            }
            setBilling(data);
            // The URL wins (fresh from the account step); otherwise resume
            // what was saved.
            if (!parseInterval(searchParams.get("interval")) && data.billing_interval) {
                setBillingInterval(data.billing_interval);
            }
            setPhase("paying");
        };
        load();
        // Load once per tenant; the interval param is only an initial value.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tenant]);

    const domainsHref = `/prepcenter/onboard/${tenant}/domains`;
    const annual = interval === "annual";
    const firstCharge = formatUsd(annual ? PLAN.annualTotal : PLAN.monthlyPrice);
    const planSummary = annual
        ? `Annual plan (${formatUsd(PLAN.annualTotal)}/year)`
        : `Monthly plan (${formatUsd(PLAN.monthlyPrice)}/month)`;

    const fetchClientSecret = useCallback(async () => {
        const res = await apiRequest(
            `/core/tenants/${tenant}/billing/checkout`,
            "POST",
            { billing_interval: interval, accept_tos: true },
        );
        if (res?.status === "success" && res.data?.client_secret) {
            return res.data.client_secret as string;
        }
        throw new Error(
            res?.errors?.[0] ?? res?.data?.message ?? "Couldn't start checkout.",
        );
    }, [tenant, interval]);

    const handleCheckoutError = (message: string) => {
        setError(message);
        setCheckoutKey(0);
    };

    // Stripe saved the card. Take the first payment: the API finds the Boxem
    // customer (no webhook, so the first polls can come back "pending") and
    // creates the invoice. It never bills twice, however often this runs.
    const handleComplete = async () => {
        setPhase("charging");
        for (let attempt = 0; attempt < POLL_ATTEMPTS && alive.current; attempt++) {
            const res = await apiRequest(
                `/core/tenants/${tenant}/billing/complete`,
                "POST",
            );
            if (!alive.current) return;
            if (res?.status !== "success") {
                handleCheckoutError(
                    res?.errors?.[0] ??
                        res?.data?.message ??
                        "We couldn't take your first payment. Please try again.",
                );
                setPhase("paying");
                return;
            }
            if (res.data?.status === "complete") {
                setPhase("done");
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
        }
        if (alive.current) setPhase("processing");
    };

    const startCheckout = () => {
        setError(null);
        setCheckoutKey((key) => key + 1);
    };

    return (
        <OnboardLayout step={3}>
            {phase === "loading" && (
                <div className="flex justify-center pt-32">
                    <LoadingWheel />
                </div>
            )}

            {phase === "charging" && (
                <div className="flex flex-col items-center gap-4 pt-32 text-slate-600">
                    <LoadingWheel />
                    <p>Processing your first payment</p>
                </div>
            )}

            {phase === "done" && (
                <div className="pt-10">
                    <DonePanel title="You're all set" continueHref={domainsHref}>
                        {`We've billed your first ${annual ? "year" : "month"}. Your dashboard is being created now, and the next step is connecting your domain.`}
                    </DonePanel>
                </div>
            )}

            {phase === "processing" && (
                <div className="pt-10">
                    <DonePanel title="Payment processing" continueHref={domainsHref}>
                        We're finalizing your first payment. Your dashboard will
                        start setting up as soon as it goes through.
                    </DonePanel>
                </div>
            )}

            {phase === "already_done" && (
                <div className="pt-10">
                    <DonePanel title="You're already signed up" continueHref={domainsHref}>
                        Your first payment has been taken. Continue to see your
                        dashboard's progress and connect your domain.
                    </DonePanel>
                </div>
            )}

            {phase === "paying" && billing && (
                <div className="mx-auto max-w-2xl">
                    <section className="rounded-[20px] border border-white/80 bg-white/85 p-6 shadow-[0_24px_60px_-20px_rgba(24,33,69,0.25)] ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-10">
                        <h1 className="text-2xl font-semibold tracking-tight text-[#182145]">
                            Add your payment method
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Billing for{" "}
                            <span className="font-semibold text-[#182145]">
                                {billing.company_name}
                            </span>{" "}
                            on the{" "}
                            <span className="font-medium text-[#182145]">
                                {planSummary}
                            </span>
                            . You'll be charged {firstCharge} today for your
                            first {annual ? "year" : "month"}, then{" "}
                            {annual ? "yearly" : "monthly"}.
                        </p>

                        {checkoutKey === 0 ? (
                            <>
                                <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm/6 text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={acceptedTerms}
                                        onChange={(e) =>
                                            setAcceptedTerms(e.target.checked)
                                        }
                                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-accent focus:ring-accent"
                                    />
                                    <span>
                                        I agree to the{" "}
                                        <a
                                            href={BOXEM_TERMS_URL}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-medium text-accent underline underline-offset-2"
                                        >
                                            Boxem Terms of Service
                                        </a>
                                        , including section 16 for Prepflow
                                        customers, and authorize Boxem to charge
                                        my card {firstCharge} today and each{" "}
                                        {annual ? "year" : "month"} until I
                                        cancel.
                                    </span>
                                </label>

                                <button
                                    type="button"
                                    onClick={startCheckout}
                                    disabled={!acceptedTerms}
                                    className="mt-8 inline-flex items-center justify-center gap-x-2 rounded-xl bg-[linear-gradient(60deg,#C33764,#302B63)] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                >
                                    <span>Continue to payment</span>
                                    <FaChevronRight size={12} />
                                </button>
                            </>
                        ) : (
                            <div className="mt-8 overflow-hidden rounded-2xl">
                                <EmbeddedCheckout
                                    key={checkoutKey}
                                    fetchClientSecret={fetchClientSecret}
                                    onComplete={handleComplete}
                                    onError={handleCheckoutError}
                                />
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}
                    </section>
                </div>
            )}
        </OnboardLayout>
    );
}
