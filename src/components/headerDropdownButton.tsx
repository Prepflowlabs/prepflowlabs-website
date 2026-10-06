/** @format */

// components/HoverFlyoutMenu.tsx
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function HoverFlyoutMenu({
    label,
    sections,
    gridCols,
    isScrolled,
}: {
    label: string;
    sections: {
        title: string;
        items: { name: string; description: string; href: string; icon: any }[];
    }[];
    gridCols: number;
    isScrolled: boolean;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button className="inline-flex items-center gap-x-1.5 whitespace-nowrap rounded px-3 py-1 text-sm font-medium text-slate-800 transition-colors hover:text-slate-950">
                <span>{label}</span>
                <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 ease-out ${
                        open ? "rotate-180" : "rotate-0"
                    } `}
                />
            </button>

            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div
                    className={`${
                        isScrolled ? "top-10" : "top-full"
                    } absolute left-1/2 -translate-x-1/2 mt-2 w-[40rem] rounded-2xl bg-white shadow-lg ring-1 ring-black/5`}
                >
                    <div
                        className={`grid ${
                            gridCols === 1 ? "grid-cols-1" : "grid-cols-2"
                        } gap-6 p-6`}
                    >
                        {sections.map((section) => (
                            <div key={section.title}>
                                <p className="text-xs font-semibold text-slate-500 uppercase">
                                    {section.title}
                                </p>
                                <ul className="mt-4 space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className="group flex items-start gap-x-3 rounded-md p-2 text-sm text-slate-700 hover:bg-slate-50"
                                            >
                                                <div className="">
                                                    <item.icon
                                                        className="h-5 w-5 text-slate-400 group-hover:text-[#C33764]"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <span className="font-medium group-hover:text-slate-900">
                                                        {item.name}
                                                    </span>
                                                    {item.description && (
                                                        <p className="text-sm text-gray-500">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 rounded-b-2xl bg-gray-50 text-sm">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
              >
                <item.icon
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400"
                />
                {item.name}
              </a>
            ))}
          </div> */}
                </div>
            </Transition>
        </div>
    );
}
