/** @format */

import clsx from "clsx";
import { PLAN, type BillingInterval } from "./plan";

const OPTIONS: { value: BillingInterval; label: string }[] = [
    { value: "monthly", label: "Monthly" },
    { value: "annual", label: "Annually" },
];

export default function BillingToggle({
    interval,
    onChange,
}: {
    interval: BillingInterval;
    onChange: (interval: BillingInterval) => void;
}) {
    return (
        <div
            role="radiogroup"
            aria-label="Billing period"
            className="inline-flex items-center gap-1 rounded-xl border border-white/80 bg-white/50 p-1.5 shadow-sm ring-1 ring-slate-900/5 backdrop-blur-md"
        >
            {OPTIONS.map((option) => {
                const active = option.value === interval;
                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => onChange(option.value)}
                        className={clsx(
                            "inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-sm transition-all duration-200 cursor-pointer",
                            active
                                ? "bg-white font-semibold text-[#182145] shadow-[0_2px_10px_rgba(24,33,69,0.12)] ring-1 ring-slate-900/5"
                                : "font-medium text-slate-500 hover:text-slate-800",
                        )}
                    >
                        {option.label}
                        {option.value === "annual" && (
                            <span className="rounded-md bg-accent px-2 py-1 text-xs font-semibold leading-none text-white">
                                {PLAN.annualSavingsLabel}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
