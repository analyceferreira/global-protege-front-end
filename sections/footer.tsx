"use client";

import { SectionContainer } from "@/components/sectionContainer";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-center bg-primary shadow-md py-8">
      <SectionContainer>
        <div className="flex items-center justify-center md:justify-between">
          <Image
            src="/logo-GlobalProtege-expanded.png"
            alt="Logo"
            width={150}
            height={150}
            className="hidden md:block"
          />
          <div className="flex gap-2 items-center justify-center text-white">
            Nos siga nas redes sociais
            <Link
              href={"https://www.facebook.com/globalprotege"}
              target="_blank"
            >
              <Facebook
                className=" rounded-full p-1 bg-accent hover:bg-amber-500 text-primary cursor-pointer"
                size={30}
              />
            </Link>
            <Link
              href={"https://www.facebook.com/globalprotege"}
              target="_blank"
            >
              <Instagram
                className=" rounded-full p-1 bg-accent hover:bg-amber-500 text-primary cursor-pointer"
                size={30}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 text-center md:text-start md:flex-row items-center justify-between my-4 text-white font-bold">
          <p>Formas de pagamento:</p>
          <div className="flex flex-col">
            <p className="text-xs text-accent-light">Cartões de crédito</p>
            <Image
              src="/payments.png"
              alt="Cartões de crédito"
              height={150}
              width={200}
              className="w-full h-auto"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xs text-accent-light">Pagamento com pix</p>
            <Image
              src="/pix.png"
              alt="pix"
              height={50}
              width={70}
              className=""
            />
          </div>
        </div>
        <div className="w-full border-t-[0.5px] h-0 my-2"></div>
        <div
          className="flex flex-col items-center justify-center  opacity-80 
                      text-accent-light text-sm text-center font-light"
        >
          <p>GlobalProtege CNPJ 12.123.1234/0001-00</p>
          <p>© {new Date().getFullYear()} todos os direitos registrados.</p>
        </div>
      </SectionContainer>
    </footer>
  );
};

export { Footer };
