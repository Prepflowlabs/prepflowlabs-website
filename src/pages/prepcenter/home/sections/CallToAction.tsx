/** @format */
import { FaChevronRight } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Container } from "./container";

export function CallToAction() {
    return (
        <section
            id="get-started-today"
            className="relative overflow-hidden bg-[#DDE1E5] py-32"
        >
            <Container className="relative">
                <div className="mx-auto max-w-lg text-center">
                    <h2 className="font-display text-3xl tracking-tight text-black font-semibold sm:text-4xl">
                        Ready to get started?
                    </h2>
                    <p className="mt-4 text-lg tracking-tight text-slate-700 font-medium">
                        Start improving your prep center's efficiency to
                        maximize your profit.
                    </p>
                    <a
                        href="/pricing"
                        className="group mt-10 text-sm relative inline-flex items-center justify-center gap-x-2 px-6 py-2 font-medium text-white rounded-xl
                                                              bg-[linear-gradient(60deg,#C33764,#302B63)]
                                                              cursor-pointer hover:opacity-90 transition-all duration-300 overflow-hidden"
                    >
                        <p>Get Started</p>

                        {/* Chevron Right (default) */}
                        <FaChevronRight
                            size={16}
                            className="transition-all duration-300 opacity-100 group-hover:opacity-0"
                        />

                        {/* Arrow Right (on hover) */}
                        <IoMdArrowRoundForward
                            size={20}
                            className="absolute right-6 transition-all duration-300 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1"
                        />
                    </a>
                </div>
            </Container>
        </section>
    );
}
