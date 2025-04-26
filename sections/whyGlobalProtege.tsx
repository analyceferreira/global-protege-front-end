/* eslint-disable react-hooks/rules-of-hooks */
import { HomeCard } from "@/components/homeCard";
import { SectionContainer } from "@/components/sectionContainer";
import SectionTitle from "@/components/sectionTitle";
import { useWhys } from "@/hooks/whys";
import { IWhysItem } from "@/services/api/whys";
import React from "react";

const WhyGlobalProtege: React.FC = async () => {
  const cards: IWhysItem[] = await useWhys();

  const renderCards = () => {
    return cards.map((Homecard, index) => (
      <HomeCard
        key={index}
        title={Homecard.title}
        description={Homecard.description}
        titleClassName="md:text-2xl"
        className="md:p-3 md:max-w-[30%] md:h-full bg-white/80"
        textCenter
      />
    ));
  };
  return (
    <div
      id="why-global-protege"
      className='bg-[url("/mulher-feliz-viajando-global-protege-seguro-viagem-1.jpg")]  bg-cover bg-no-repeat bg-bottom overflow-clip
                 w-full md:h-[640px] 
                 flex justify-center'
    >
      <SectionContainer className="md:gap-16 lg:gap-44">
        <SectionTitle title="Por que comprar seguro viagem na Global Protege?" />
        <div className="flex flex-row place-self-end max-h-fit items-end gap-4 pb-8 flex-wrap md:flex-nowrap md:justify-between">
          {renderCards()}
        </div>
      </SectionContainer>
    </div>
  );
};

export default WhyGlobalProtege;
