import { HeroForm } from "@/components/heroForm";
import { SectionContainer } from "@/components/sectionContainer";
import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="flex w-full justify-center min-h-[560px] py-6 md:py-0 bg-primary relative">
      <Image
        src="/bg-hero.png"
        alt="Hero Image"
        width={1000}
        height={560}
        className="hidden md:flex absolute h-full w-full z-0 object-cover object-center"
      />
      <SectionContainer className="relative z-10 justify-center gap-10">
        <h1 className="text-2xl font-bold text-white text-center 
                      md:text-3xl lg:text-4xl md:text-left">
          <span className="text-highlight">
            Sua viajem segura sem dor de cabeça!{" "}
          </span>{" "}
          <br />
          Compare, escolha e viaje seguro.
        </h1>
        <HeroForm />
      </SectionContainer>
    </div>
  );
};

export default Hero;
