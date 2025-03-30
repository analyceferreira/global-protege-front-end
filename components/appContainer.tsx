import { cn } from "@/utils/cn";
import React from "react";

interface IAppContainer {
  children: React.ReactNode;
  className?: string;
}

const AppContainer = ({ children, className }: IAppContainer) => {
  return (
    <section className={cn(`flex flex-col w-full max-w-[1200px] ${className}`)}>
      {children}
    </section>
  );
};

export { AppContainer };
