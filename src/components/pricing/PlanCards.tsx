/** @format */

import type { ReactNode } from "react";
import { FaCheck, FaChevronRight } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";
import {
    PLAN,
    PLAN_EXTRAS,
    PLAN_FEATURES,
    PLAN_LIMITS,
    formatUsd,
    type BillingInterval,
} from "./plan";

export interface PlanCta {
    label: string;
    href: string;
}

// Layout follows boxem.com/pricing; the look is Prepflow's: frosted white cards
// that sit on the site's cloud-and-ray background, with the brand gradient
// (#C33764 → #302B63) on the CTA and a soft rose/lilac halo on the plan card.
export const GLASS_CARD =
    "relative overflow-hidden rounded-[20px] border border-white/80 bg-white/75 text-slate-600 shadow-[0_24px_60px_-20px_rgba(24,33,69,0.25)] ring-1 ring-slate-900/5 backdrop-blur-xl";

function CheckItem({ children }: { children: ReactNode }) {
    return (
        <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent shadow-[0_0_10px_rgba(195,55,100,0.45)]">
                <FaCheck size={8} className="text-white" />
            </span>
            <span>{children}</span>
        </li>
    );
}

function Divider() {
    return <div className="my-6 h-px bg-slate-900/10" />;
}

export function Halo() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-96 w-60 rotate-[35deg] rounded-full bg-[linear-gradient(180deg,rgba(195,55,100,0.35)_0%,rgba(158,122,216,0.25)_45%,transparent_100%)] blur-3xl"
        />
    );
}

function CtaLink({ cta }: { cta: PlanCta }) {
    return (
        <a
            href={cta.href}
            className="group relative mt-6 inline-flex w-full items-center justify-center gap-x-2 overflow-hidden rounded-xl bg-[linear-gradient(60deg,#C33764,#302B63)] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
        >
            <span>{cta.label}</span>
            <FaChevronRight
                size={12}
                className="transition-all duration-300 opacity-100 group-hover:opacity-0"
            />
            <IoMdArrowRoundForward
                size={16}
                className="absolute right-6 transition-all duration-300 opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
            />
        </a>
    );
}

function PlanCard({
    interval,
    cta,
    compact,
}: {
    interval: BillingInterval;
    cta?: PlanCta;
    compact: boolean;
}) {
    const annual = interval === "annual";
    const price = annual ? PLAN.annualMonthlyPrice : PLAN.monthlyPrice;

    return (
        <div className={`${GLASS_CARD} p-8`}>
            <Halo />
            <div className="relative">
                <h3 className="text-lg font-semibold text-[#182145]">
                    {PLAN.name}
                </h3>
                <p className="mt-2 text-sm/6">{PLAN.description}</p>

                <Divider />

                <div className="flex items-baseline gap-x-2">
                    <span className="text-5xl font-semibold tracking-tight text-[#182145]">
                        {formatUsd(price)}
                    </span>
                    <span className="text-sm text-slate-500">/ month</span>
                </div>
                <p className="mt-2 text-sm">
                    {annual
                        ? `Billed annually at ${formatUsd(PLAN.annualTotal)}`
                        : "Billed monthly"}
                </p>

                {cta && <CtaLink cta={cta} />}
                <p className="mt-4 text-center text-xs text-slate-500">
                    Backed by our money-back guarantee
                </p>

                <Divider />

                <ul className="space-y-3 text-sm">
                    {PLAN_FEATURES.map((feature) => (
                        <CheckItem key={feature}>{feature}</CheckItem>
                    ))}
                </ul>

                {compact && (
                    <>
                        <Divider />
                        <ul className="space-y-2 text-sm">
                            {PLAN_LIMITS.map((limit) => (
                                <li key={limit.label}>
                                    <span className="font-semibold text-[#182145]">
                                        {limit.amount}
                                    </span>{" "}
                                    {limit.label}
                                    <span className="text-slate-400">
                                        {" "}
                                        · {limit.overage}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

function LimitsCard() {
    return (
        <div className={`${GLASS_CARD} p-8`}>
            <h3 className="text-lg font-semibold text-[#182145]">
                Everything you need to scale
            </h3>
            <p className="mt-2 text-sm/6">
                Generous limits built for growing prep centers, with simple,
                predictable overage.
            </p>

            <Divider />

            <div className="space-y-6">
                {PLAN_LIMITS.map((limit) => (
                    <div key={limit.label}>
                        <div className="flex items-baseline gap-x-2">
                            <span className="text-4xl font-semibold tracking-tight text-[#182145]">
                                {limit.amount}
                            </span>
                            <span className="text-sm text-slate-500">
                                {limit.label}
                            </span>
                        </div>
                        <p className="mt-1 text-sm">{limit.overage}</p>
                    </div>
                ))}
            </div>

            <Divider />

            <ul className="space-y-3 text-sm">
                {PLAN_EXTRAS.map((extra) => (
                    <CheckItem key={extra}>{extra}</CheckItem>
                ))}
            </ul>
        </div>
    );
}

/**
 * The plan card plus a limits card, side by side like Boxem's two tiers.
 * `compact` renders the plan card alone (limits folded in) for the sign-up
 * steps' side column.
 */
export default function PlanCards({
    interval,
    cta,
    compact = false,
}: {
    interval: BillingInterval;
    cta?: PlanCta;
    compact?: boolean;
}) {
    if (compact) {
        return <PlanCard interval={interval} cta={cta} compact />;
    }
    return (
        <div className="mx-auto grid w-full max-w-[816px] grid-cols-1 gap-8 md:grid-cols-2">
            <PlanCard interval={interval} cta={cta} compact={false} />
            <LimitsCard />
        </div>
    );
}
