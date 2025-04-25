import { Menu } from "@/components/menu";
import { SearchFields } from "@/components/search/searchFields";
import { SectionContainer } from "@/components/sectionContainer";
import { Footer } from "@/sections/footer";

export default function ResultadosPage() {
  return (
    <div className="flex flex-col items-center">
      <Menu />
      <SectionContainer>
        <SearchFields />
      </SectionContainer>
      <Footer />
    </div>
  );
}
