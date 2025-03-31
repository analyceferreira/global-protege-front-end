import { CompaniesBar } from "@/components/companiesBar";
import { Menu } from "@/components/menu";
import { FAQ } from "@/sections/faq";
import { Steps } from "@/sections/steps";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center overflow-clip text-sm sm:text-base">
      <Menu />
      <CompaniesBar />
      <Steps />
      <FAQ />
    </div>
  );
}
