import { SectionContainer } from "@/components/sectionContainer";
import SectionTitle from "@/components/sectionTitle";
import { Step } from "@/components/step";
import {
  LucideBookCopy,
  LucideMailCheck,
  LucideMonitorCheck,
  LucideTextSelect,
} from "lucide-react";
import React from "react";

const Steps: React.FC = () => {
  return (
    <SectionContainer>
      <SectionTitle title="Como funciona?" />
      <div className="flex flex-col md:flex-row gap-4">
        <Step
          label="1º Passo"
          title="Preencha os dados da sua viagem"
          description="Insira os dados na página inicial (Destinos, Datas, Nome, Telefone e email)"
        >
          <LucideTextSelect
            className="text-primary size-8 sm:size-10"
            strokeWidth={1.5}
          />
        </Step>
        <Step
          label="2º Passo"
          title="Compare o seu seguro"
          description="Selecione o melhor seguro de acordo com a sua necessidade e com as melhores coberturas com praticidade e segurança."
        >
          <LucideBookCopy
            className="text-primary size-10 md:size-10"
            strokeWidth={1.5}
          />
        </Step>
        <Step
          label="3º Passo"
          title="Contrate Online"
          description="Escolha sua forma de pagamento e finalize o processo."
        >
          <LucideMonitorCheck
            className="text-primary size-10 md:size-10"
            strokeWidth={1.5}
          />
        </Step>
        <Step
          label="4º Passo"
          title="Receba sua apólice por email"
          description="A partir daqui é com a gente. Você receberá seu email de compra aprovada e jajá terá sua apólice em mãos."
        >
          <LucideMailCheck
            className="text-primary size-10 md:size-10"
            strokeWidth={1.5}
          />
        </Step>
      </div>
    </SectionContainer>
  );
};

export { Steps };
