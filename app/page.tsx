import { Menu } from "@/components/menu";
import { FAQ } from "@/sections/faq";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Menu />
      <FAQ />
    </div>
  );
}
