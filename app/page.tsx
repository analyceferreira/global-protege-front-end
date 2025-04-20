import { CompaniesBar } from "@/components/companiesBar";
import { Menu } from "@/components/menu";
import { Footer } from "@/sections/footer";
import Hero from "@/sections/hero";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center overflow-clip text-sm sm:text-base">
      <Menu />
      <CompaniesBar />
      <Hero />
      <Footer />
      <Footer />
      <Footer />
    </div>
  );
}
