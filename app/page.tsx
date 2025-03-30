import { CompaniesBar } from "@/components/companiesBar";
import { Menu } from "@/components/menu";

export default function Home() {
  return (
    <>
      <Menu />
      <CompaniesBar />
      <h1 className="text-1xl font-bold underline text-center">Hello world!</h1>
    </>
  );
}
