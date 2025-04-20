import { HeroForm } from "@/components/heroForm";
import { SectionContainer } from "@/components/sectionContainer";
import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="flex w-full justify-center min-h-[560px] bg-accent relative">
      <Image
        src="/bg-hero.png"
        alt="Hero Image"
        width={1000}
        height={560}
        className="hidden md:flex absolute h-full w-full z-0 object-cover object-center"
      />
      <SectionContainer className="relative z-10 justify-center gap-10">
        <h1 className="text-4xl md:text-2xl lg:text-4xl font-bold text-white">
          <span className="text-highlight">
            Sua viajem segura sem dor de cabeça!{" "}
          </span>{" "}
          <br />
          Compare, escolha e viaje seguro.
        </h1>
        {/* <div
          className="rounded-lg flex flex-col gap-4  
                     md:w-2/4  relative *:z-10 p-6
                     text-black"
        >
          <div className="absolute z-0 top-0 left-0 w-full h-full backdrop-blur-2xl bg-white/40 rounded-xl"></div>
          <p className="font-bold">
            Encontre o seguro viagem ideal para seu destino
          </p>
        </div> */}
          <HeroForm />

      </SectionContainer>
    </div>
  );
};

export default Hero;
