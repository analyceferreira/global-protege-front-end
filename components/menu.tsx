import React from "react";
import Image from "next/image";
import { SectionContainer } from "./sectionContainer";

const Menu = () => {
  return (
    <nav className="w-full flex justify-center bg-primary shadow-md">
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
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#insurance">Seguro Viagem</a>
            </li>
            <li>
              <a href="#companies">Seguradora</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
      </SectionContainer>
    </nav>
  );
};

export { Menu };
