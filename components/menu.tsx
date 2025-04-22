import React from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/sectionContainer";
import Link from "next/link";

const Menu = () => {
  return (
    <nav className="w-full flex justify-center bg-primary shadow-md sticky top-0 z-50">
      <SectionContainer>
        <div className="flex items-center justify-between w-full ">
          <Image
            src="/logo-GlobalProtege-expanded.png"
            alt="Logo"
            width={150}
            height={150}
          />
          <ul className="flex space-x-6 text-white *:hover:text-accent">
            <li>
              <Link href="/#">Home</Link>
            </li>
            <li>
              <Link href="/#companies">Seguradora</Link>
            </li>
            <li>
              <Link href="/#why-global-protege">Seguro Viagem</Link>
            </li>
            <li>
              <Link href="/#faq">FAQ</Link>
            </li>
          </ul>
        </div>
      </SectionContainer>
    </nav>
  );
};

export { Menu };
