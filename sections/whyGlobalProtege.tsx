/* eslint-disable react-hooks/rules-of-hooks */
import { Card } from "@/components/card";
import { SectionContainer } from "@/components/sectionContainer";
import SectionTitle from "@/components/sectionTitle";
import { useWhys } from "@/hooks/whys";
import { IWhysItem } from "@/services/api/whys";
import React from "react";

const WhyGlobalProtege: React.FC = async () => {
  const cards: IWhysItem[] = await useWhys();

  const renderCards = () => {
    return cards.map((card, index) => (
      <Card
        key={index}
        title={card.title}
        description={card.description}
        titleClassName="md:text-2xl"
        className="md:p-3 md:max-w-[30%] md:h-full bg-white/80"
        textCenter
      />
    ));
  };
  return (
    <div
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
