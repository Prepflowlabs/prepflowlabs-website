/** @format */

import kpiScreenshot from "../../../assets/prepcenter/employees.png";
import metricScreenshot from "../../../assets/prepcenter/metrics.png";

import { CloudArrowUpIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import AnimatedBackground from "../../../components/animatedBackground";

function Productivity() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                        viewBox="0 0 1024 1024"
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    >
                        <circle
                            r={512}
                            cx={512}
                            cy={512}
                            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                            fillOpacity="0.7"
                        />
                        <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#E935C1" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                            Boost your productivity. Start using our software
                            today.
                        </h2>
                        <p className="mt-6 text-lg/8 text-pretty text-gray-300">
                            Use our software to analyze your key metrics to
                            improve your workflows and increase profit.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href="/pricing"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                {" "}
                                Get started{" "}
                            </a>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8">
                        <img
                            alt="Product screenshot"
                            src={metricScreenshot}
                            width={1824}
                            height={1080}
                            className="absolute top-0 left-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const features = [
    {
        name: "Real-time.",
        description:
            "Throughout the day, view the performance of your warehouse and make changes as needed.",
        icon: CloudArrowUpIcon,
    },
    {
        name: "Units processed.",
        description:
            "See how many units each employee processes during a given time period.",
        icon: LockClosedIcon,
    },
];
function Features() {
    return (
        <div className="overflow-hidden  py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-8">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base/7 font-semibold text-[#C33764]">
                                Resolve inconsistencies
                            </h2>
                            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                Curious about your productivity?
                            </p>
                            <p className="mt-6 text-lg/8 text-gray-700">
                                View employee's average duration time for
                                shipping out shipments and other actions. Make
                                sure your employees are on task and performing
                                at a good standard.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div
                                        key={feature.name}
                                        className="relative pl-9"
                                    >
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon
                                                aria-hidden="true"
                                                className="absolute top-1 left-1 size-5 text-[#C33764]"
                                            />
                                            {feature.name}
                                        </dt>{" "}
                                        <dd className="inline">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        alt="Product screenshot"
                        src={kpiScreenshot}
                        width={2432}
                        height={1442}
                        className="mt-10 w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    />
                </div>
            </div>
        </div>
    );
}

export default function PrepcenterKPIS() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated Background */}
            <AnimatedBackground />

            <Header />
            <div className="mt-24 relative z-10">
                <div className="flex flex-col items-center justify-center px-4 pt-14 sm:px-0">
                    <div className="bg-white rounded-full p-1">
                        <div className="rounded-full border bg-slate-50 border-slate-300 text-xs px-2 py-1 font-medium">
                            Key Performance Indicators
                        </div>
                    </div>
                    <h2 className="pt-6 text-center text-5xl font-bold sm:text-6xl md:max-w-4xl">
                        Track Your{" "}
                        <span className="text-[#C33764]">
                            Warehouse & Employee KPI's{" "}
                        </span>
                        In Real-Time
                    </h2>
                    <span className="pt-5 text-center text-lg text-gray-700 sm:max-w-3xl">
                        Each fulfillment type has it's own dedicated workflow
                        optimized for sending shipments faster. Including
                        integrations to FBA, FBM and more.
                    </span>
                </div>

                <Features />

                <Productivity />
                <Footer />
            </div>
        </div>
    );
}
