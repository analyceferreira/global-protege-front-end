import Image from "next/image";
import Link from "next/link";
import React from "react";

const WhatsappButton = () => {
  const phoneNumber = "5511999999999";
  const message = "Olá, gostaria de mais informações!";

  const encodedMessage = message ? encodeURIComponent(message) : "";
  const whatsappUrl = `https://wa.me/${phoneNumber}${
    encodedMessage ? `?text=${encodedMessage}` : ""
  }`;

  const whatsButton = (
    <Link
      href={whatsappUrl}
      target="_blank"
      className="fixed bottom-4 z-10 right-4 
                 transition duration-300"
    >
      <Image src="/icons/whatsapp.png" alt="WhatsApp" width={64} height={64} />
    </Link>
  );

  const textButton = (
    <Link
      href={whatsappUrl}
      target="_blank"
      className="flex items-center gap-1 fixed bottom-4 z-10 right-4 
      bg-green-500 text-white px-3 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
    >
      <Image src="/icons/whatsapp.png" alt="WhatsApp" width={36} height={36} />
      Fale conosco
    </Link>
  );

  return textButton;
};

export { WhatsappButton };
