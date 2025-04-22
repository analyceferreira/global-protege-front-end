import { cn } from "@/utils/cn";
import React from "react";

interface ISectionContainer {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionContainer = ({ children, className, id }: ISectionContainer) => {
  return (
    <section
      id={id}
      className={cn(
        `flex flex-col w-full px-4 lg:px-0 max-w-[1200px] ${className}`
      )}
    >
      {children}
    </section>
  );
};

export { SectionContainer };
