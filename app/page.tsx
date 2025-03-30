import { CompaniesBar } from "@/components/companiesBar";
import { Menu } from "@/components/menu";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Menu />
      <CompaniesBar />
    </div>
  );
}
