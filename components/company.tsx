import React from "react";
import Image from "next/image";
import { AccordionItem } from "./accordion";

interface ICompanyProps {
  imageUrl: string;
  altText?: string;
  guaranteeBy: string;
  description: string;
}

const Company: React.FC<ICompanyProps> = ({
  imageUrl,
  altText,
  guaranteeBy: title,
  description,
}: ICompanyProps) => {
  return (
    <div
      className="inline-flex flex-col h-full min-h-max justify-center items-center
                md:max-w-[32%] p-6 gap-6 
                bg-gray-300 rounded-xl"
    >
      <Image
        src={imageUrl}
        alt={altText || "Company Logo"}
        width={340}
        height={500}
        className="h-[200px] object-cover"
      />
      <AccordionItem title={title} description={description} dividerOff />
    </div>
  );
};

export { Company };
