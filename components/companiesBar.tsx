"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { JSX, useRef } from "react";

import { ReactNode } from "react";

const companies = [
  { name: "Company 1", logo: "/companies/coris.png" },
  { name: "Company 2", logo: "/companies/assistcard.png" },
  { name: "Company 3", logo: "/companies/affinity.png" },
  { name: "Company 4", logo: "/companies/universalassistance.png" },
];

const Box = ({
  children,
  className,
  anim,
}: {
  children: ReactNode;
  className: string;
  anim?: string;
}) => {
  return (
    <div className={"box " + className} data-animate={anim}>
      {children}
    </div>
  );
};

const CompaniesBar = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to("[data-animate='move']", {
        xPercent: 10,
        duration: 50,
        ease: "linear",
        repeat: -1,
      });
    },
    { scope: container }
  ); // <-- scope for selector text (optional)

  interface Company {
    name: string;
    logo: string;
  }

  const renderChildren = (companies: Company[]): JSX.Element[] => {
    const children = [];
    for (let i = 0; i < 200; i++) {
      children.push(
        <Image
          key={i}
          src={companies[i % companies.length].logo}
          alt={companies[i % companies.length].name}
          className="object-contain"
          width={50}
          height={30}
          loading="lazy"
        />
      );
    }
    return children;
  };

  return (
    <div
      className="w-max h-full justify-between items-center relative -left-[100%] overflow-hidden bg-secondary"
      ref={container}
    >
      <Box anim="move" className="flex  gap-5 h-[30px]">
        {renderChildren(companies)}
      </Box>
    </div>
  );
};
export { CompaniesBar };
