import { cn } from "@/utils/cn";
import React from "react";

interface StepProps {
  title: string;
  label: string;
  description: string;
  children?: React.ReactNode;
  strokeColor?: string;
  className?: string;
}

const Step: React.FC<StepProps> = ({
  title,
  label,
  description,
  children,
  strokeColor = "border-stroke",
  className,
}) => {
  return (
    <div
      className={cn(
        `card w-full md:max-w-[33%] xl:max-w-[390px] flex flex-col md:gap-4 p-6 bg-accent-light rounded-3xl border-1 border-none`,
        strokeColor,
        className
      )}
    >
      {children && (
        <div className="mx-auto mb-2 md:mb-0 p-2 md:p-3 rounded-full bg-primary">
          {children}
        </div>
      )}
      <div>
        <p className="text-primary">{label}</p>
        <h2 className="text-base md:text-xl font-bold">{title}</h2>
      </div>
      <p className="md:min-h-28">{description}</p>
    </div>
  );
};

export { Step };
