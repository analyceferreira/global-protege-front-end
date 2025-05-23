/* eslint-disable react-hooks/rules-of-hooks */
import { AccordionItem } from "@/components/accordion";
import { SectionContainer } from "@/components/sectionContainer";
import SectionTitle from "@/components/sectionTitle";
import { useFAQ } from "@/hooks/faq";
import { IFAQItem } from "@/services/api/faq";
import React from "react";

const FAQ: React.FC = async () => {
  const faq: IFAQItem[] = await useFAQ();

  const renderAccordionItems = () => {
    return faq.map((item) => (
      <AccordionItem
        key={item.id}
        title={item.question}
        description={item.answer}
      />
    ));
  };
  return (
    <SectionContainer id="faq" className="md:max-w-[90%] lg:max-w-[60%]">
      <SectionTitle title="Dúvidas frequentes" />
      <div>{renderAccordionItems()}</div>
    </SectionContainer>
  );
};

export { FAQ };
