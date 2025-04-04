import { CompaniesBar } from "@/components/companiesBar";
import { Menu } from "@/components/menu";
import { Coverages } from "@/sections/coverages";
import { Destinations } from "@/sections/destinations";
import { FAQ } from "@/sections/faq";
import { Steps } from "@/sections/steps";
import WhyGlobalProtege from "@/sections/whyGlobalProtege";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center overflow-clip text-sm sm:text-base">
      <Menu />
      <CompaniesBar />
      {/* <Companies /> */}
      <WhyGlobalProtege />
      <Destinations />
      <Coverages />
      <Steps />
      <FAQ />
    </div>
  );
}
