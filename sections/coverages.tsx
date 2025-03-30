/* eslint-disable react-hooks/rules-of-hooks */
import { AccordionItem } from "@/components/accordion";
import { AppContainer } from "@/components/appContainer";
import SectionTitle from "@/components/sectionTitle";
import { useCoverages } from "@/hooks/coverages";
import { ICoveragesItem } from "@/services/api/coverages";
import Image from "next/image";
import React from "react";

const Coverages: React.FC = async () => {
  const items: ICoveragesItem[] = await useCoverages();
  const renderAccordionItems = () => {
    return items.map((item, index) => (
      <AccordionItem
        key={index}
        title={item.title}
        description={item.description}
      />
    ));
  };
  return (
    <AppContainer>
      <SectionTitle title="Principais coberturas" />
      <div className="flex flex-col gap-8 md:gap-20 md:flex-row">
        <Image
          src="/global-protege-seguro-viagem-homem-feliz-viagem-segura.jpg"
          alt="Coverages"
          width={1000}
          height={1000}
          className="flex-1/3 max-h-[500px] md:max-w-2/5 lg:max-w-full object-cover "
        />
        <div className="flex-2/3 flex flex-col w-full gap-4">
          {renderAccordionItems()}
        </div>
      </div>
    </AppContainer>
  );
};

export { Coverages };
