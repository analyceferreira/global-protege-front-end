import { cn } from "@/utils/cn";
import React from "react";

interface IAppContainer {
  children: React.ReactNode;
  className?: string;
}

const AppContainer = ({ children, className }: IAppContainer) => {
  return (
    <div className={cn(`flex w-full max-w-[1200px] ${className}`)}>
      {children}
    </div>
  );
};

export { AppContainer };
