/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { SectionContainer } from "@/components/sectionContainer";
import { Company } from "@/components/company";
import { ICompaniesItem } from "@/services/api/companies";
import { useCompanies } from "@/hooks/companies";
import SectionTitle from "@/components/sectionTitle";

const Companies: React.FC = async () => {
  const companies: ICompaniesItem[] = await useCompanies();
  return (
    <SectionContainer>
      <SectionTitle title="As seguradoras mais confiáveis ao seu alcance!" />
      <div className="overflow-x-hidden gap-4 p-4">
        {companies.map((company, index) => (
          <Company
            key={index}
            imageUrl={company.logoUrl}
            altText={company.name}
            guaranteeBy={company.guaranteeBy}
            description={company.description}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export { Companies };
