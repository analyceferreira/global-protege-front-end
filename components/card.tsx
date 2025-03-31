import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  strokeColor?: string;
  className?: string;
  textCenter?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt,
  strokeColor = "border-stroke",
  className,
  textCenter = false,
}) => {
  return (
    <div
      className={cn(
        `card max-w-[390px] flex flex-col gap-4 p-6 bg-white rounded-3xl border-1`,
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
          className="object-cover rounded-xl"
        />
      )}
      <h2 className="text-secondary text-2xl font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export { Card };
