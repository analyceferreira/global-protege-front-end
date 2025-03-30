import { Menu } from "@/components/menu";
import { Coverages } from "@/sections/coverages";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Menu />
      <Coverages />
    </div>
  );
}
