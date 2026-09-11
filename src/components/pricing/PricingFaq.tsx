/** @format */

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaChevronRight } from "react-icons/fa";
import { PRICING_FAQS } from "./plan";

export default function PricingFaq() {
    return (
        <section className="mx-auto w-full max-w-3xl px-4">
            <div className="flex flex-col items-center">
                <div className="rounded-full bg-white p-1">
                    <div className="rounded-full border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium">
                        FAQs
                    </div>
                </div>
                <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    We've got the answers
                </h2>
            </div>

            <div className="mt-10 space-y-3">
                {PRICING_FAQS.map((faq) => (
                    <Disclosure
                        key={faq.question}
                        as="div"
                        className="rounded-2xl border border-gray bg-white/70 backdrop-blur-sm"
                    >
                        <DisclosureButton className="group flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-slate-900">
                            {faq.question}
                            <FaChevronRight
                                size={12}
                                className="shrink-0 text-slate-500 transition-transform duration-200 group-data-open:rotate-90"
                            />
                        </DisclosureButton>
                        <DisclosurePanel className="-mt-1 px-6 pb-5 text-sm/6 text-slate-600">
                            {faq.answer}
                        </DisclosurePanel>
                    </Disclosure>
                ))}
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray bg-white/70 px-6 py-5 backdrop-blur-sm sm:flex-row sm:items-center">
                <div>
                    <p className="font-semibold text-slate-900">
                        Can't find the answer to your question?
                    </p>
                    <p className="text-sm text-slate-600">
                        Our team is happy to help.
                    </p>
                </div>
                <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(60deg,#C33764,#302B63)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                    Contact us
                    <EnvelopeIcon className="h-4 w-4" />
                </a>
            </div>
        </section>
    );
}
