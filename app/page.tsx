import { CompaniesBar } from "@/components/companiesBar";
import { Menu } from "@/components/menu";
import { Coverages } from "@/sections/coverages";
import { FAQ } from "@/sections/faq";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center overflow-clip">
      <Menu />
      <CompaniesBar />
      <Coverages />
      <FAQ />
    </div>
  );
}
