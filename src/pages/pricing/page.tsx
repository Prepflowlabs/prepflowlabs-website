/** @format */

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AnimatedBackground from "../../components/animatedBackground";
import Footer from "../../components/footer";
import Header from "../../components/header";
import BillingToggle from "../../components/pricing/BillingToggle";
import PlanCards from "../../components/pricing/PlanCards";
import PricingFaq from "../../components/pricing/PricingFaq";
import {
    parseInterval,
    type BillingInterval,
} from "../../components/pricing/plan";

// Layout mirrors boxem.com/pricing (Boxem owns Prepflow); colours stay Prepflow's.
function PricingPage() {
    const [searchParams] = useSearchParams();
    const [interval, setBillingInterval] = useState<BillingInterval>(
        parseInterval(searchParams.get("interval")) ?? "monthly",
    );

    return (
        // bg-white: AnimatedBackground is translucent and switches off on
        // mobile, so give it an explicit ground rather than the browser default.
        <div className="relative min-h-screen overflow-hidden bg-white">
            <AnimatedBackground />

            <Header />
            <div className="relative z-10 mt-32 space-y-24 sm:mt-40 sm:space-y-32">
                <section className="flex flex-col items-center px-4">
                    <div className="rounded-full bg-white p-1">
                        <div className="rounded-full border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium">
                            Transparent Pricing
                        </div>
                    </div>
                    <h1 className="mt-4 max-w-2xl text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl/tight">
                        One plan. Everything included.
                    </h1>
                    <p className="mt-4 max-w-xl text-center font-medium text-slate-700">
                        Run your whole prep center on Prepflow, with no add-ons
                        or per-feature upsells.
                    </p>

                    <div className="mt-8">
                        <BillingToggle
                            interval={interval}
                            onChange={setBillingInterval}
                        />
                    </div>

                    <div className="mt-8 w-full">
                        <PlanCards
                            interval={interval}
                            cta={{
                                label: "Get started",
                                href: `/prepcenter/onboard?interval=${interval}`,
                            }}
                        />
                    </div>
                </section>

                <PricingFaq />

                <Footer />
            </div>
        </div>
    );
}

export default PricingPage;
