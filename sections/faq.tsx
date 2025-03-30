/* eslint-disable react-hooks/rules-of-hooks */
import { AccordionItem } from "@/components/accordion";
import { AppContainer } from "@/components/appContainer";
import SectionTitle from "@/components/sectionTitle";
import { useFAQ } from "@/hooks/faq";
import { FAQItem } from "@/services/api/faq";
import React from "react";

const FAQ: React.FC = async () => {
  const faq: FAQItem[] = await useFAQ();

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
    <AppContainer className="max-w-[60%] gap-14">
      <SectionTitle title="Dúvidas frequentes" />
      <div>{renderAccordionItems()}</div>
    </AppContainer>
  );
};

export { FAQ };
