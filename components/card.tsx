import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  strokeColor?: string;
  titleClassName?: string;
  className?: string;
  textCenter?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt,
  strokeColor = "border-stroke",
  titleClassName,
  className,
  textCenter = false,
}) => {
  return (
    <div
      className={cn(
        `card w-full md:max-w-[33%] xl:max-w-[390px] flex flex-col justify-center gap-4 p-6 bg-white/80 rounded-3xl border-1`,
        strokeColor,
        className,
        textCenter ? "text-center" : "text-left"
      )}
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt || "GlobalProtege Image"}
          width={646}
          height={485}
          className="object-cover rounded-xl w-full"
        />
      )}
      <div className="md:min-h-24 flex justify-center items-center">
        <h2
          className={cn(
            `text-secondary text-lg md:text-2xl font-bold ${titleClassName}`
          )}
        >
          {title}
        </h2>
      </div>
      <p className="md:min-h-36">{description}</p>
    </div>
  );
};

export { Card };
