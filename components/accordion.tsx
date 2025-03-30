"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type AccordionItemType = {
  title: string;
  description: string;
};

const AccordionItem = (props: AccordionItemType) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" w-full text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between text-start "
      >
        <h3 className={`text-base font-bold`}>{props.title}</h3>
        <ChevronDown
          size={22}
          className={`transition-transform duration-300
            ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className="py-2 text-secondary-text">{props.description}</div>
      )}
      <hr className="my-4 h-[1px] text-stroke-light" />
    </div>
  );
};

export { AccordionItem };
