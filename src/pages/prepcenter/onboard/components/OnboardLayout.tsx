/** @format */

import type { ReactNode } from "react";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import AnimatedBackground from "../../../../components/animatedBackground";

const STEPS = ["Plan", "Account", "Payment", "Domain setup"];

/** Shared shell for the sign-up steps: logo, step indicator, the site's
 *  cloud background. */
export default function OnboardLayout({
    step,
    children,
}: {
    step: 2 | 3 | 4;
    children: ReactNode;
}) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-white">
            <AnimatedBackground />
            <div className="relative z-10">
                <header className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pt-8 sm:flex-row sm:justify-between">
                    <a href="/">
                        <img
                            src="/logo.png"
                            alt="Prepflowlabs"
                            className="h-7 w-auto"
                        />
                    </a>
                    <ol className="flex items-center gap-1 rounded-xl border border-white/80 bg-white/50 p-1.5 text-sm shadow-sm ring-1 ring-slate-900/5 backdrop-blur-md">
                        {STEPS.map((label, index) => {
                            const number = index + 1;
                            const state =
                                number < step
                                    ? "done"
                                    : number === step
                                      ? "current"
                                      : "upcoming";
                            const content = (
                                <>
                                    <span
                                        className={clsx(
                                            "flex h-5 w-5 items-center justify-center rounded-full text-xs",
                                            state === "current" &&
                                                "bg-[#182145] text-white",
                                            state === "done" &&
                                                "bg-accent text-white",
                                            state === "upcoming" &&
                                                "bg-slate-200 text-slate-500",
                                        )}
                                    >
                                        {state === "done" ? (
                                            <FaCheck size={8} />
                                        ) : (
                                            number
                                        )}
                                    </span>
                                    <span
                                        className={clsx(
                                            state !== "current" &&
                                                "hidden sm:inline",
                                        )}
                                    >
                                        {label}
                                    </span>
                                </>
                            );
                            const className = clsx(
                                "flex items-center gap-2 rounded-[10px] px-3 py-1.5",
                                state === "current" &&
                                    "bg-white font-semibold text-[#182145] shadow-[0_2px_10px_rgba(24,33,69,0.12)] ring-1 ring-slate-900/5",
                                state === "done" &&
                                    "font-medium text-slate-700",
                                state === "upcoming" &&
                                    "font-medium text-slate-400",
                            );
                            return (
                                <li
                                    key={label}
                                    aria-current={
                                        state === "current" ? "step" : undefined
                                    }
                                >
                                    {/* The plan was picked on /pricing — let people go back and change it. */}
                                    {label === "Plan" ? (
                                        <a
                                            href="/pricing"
                                            className={clsx(
                                                className,
                                                "hover:text-slate-900",
                                            )}
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <div className={className}>
                                            {content}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </header>
                <main className="mx-auto max-w-6xl px-4 pb-20 pt-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
