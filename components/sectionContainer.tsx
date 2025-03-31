import { cn } from "@/utils/cn";
import React from "react";

interface ISectionContainer {
  children: React.ReactNode;
  className?: string;
}

const SectionContainer = ({ children, className }: ISectionContainer) => {
  return (
    <section className={cn(`flex flex-col w-full max-w-[1200px] ${className}`)}>
      {children}
    </section>
  );
};

export { SectionContainer };
