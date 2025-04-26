import { Menu } from "@/components/menu";
import { SearchFields } from "@/components/search/searchFields";
import { SectionContainer } from "@/components/sectionContainer";
import { WhatsappButton } from "@/components/whatsappButton";
import { Footer } from "@/sections/footer";
import { PlansSection } from "@/sections/plans";

export default function ResultadosPage() {
  return (
    <div className="flex flex-col items-center">
      <Menu />
      <SectionContainer>
        <SearchFields />
        <PlansSection />
        <WhatsappButton />
      </SectionContainer>
      <Footer />
    </div>
  );
}
