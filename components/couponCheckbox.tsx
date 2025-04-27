"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { PromoCode } from "@/utils/types/promo";

const promo = {
  name: "PROMO20",
  description: "Aplicar cupom de 20% de desconto",
  percente: 20,
};

const CoupomCheckbox = ({}) => {
  const [promoCode, setPromoCode] = useState<PromoCode | undefined>();

  React.useEffect(() => {
    console.log("promoCode", promoCode);
    if (promoCode) {
      localStorage.setItem("promoCode", JSON.stringify(promoCode));
    } else {
      localStorage.removeItem("promoCode");
    }
  }, [promoCode]);

  return (
    <div className="flex md:items-center w-full space-x-2">
      <Checkbox
        id="promoCode"
        checked={promoCode ? true : false}
        onCheckedChange={(checked) =>
          checked ? setPromoCode(promo) : setPromoCode(undefined)
        }
        className="border-black border-2 size-5 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
      />
      <Label
        htmlFor="promoCode"
        className={cn(
          `text-base font-medium ${
            promoCode?.valueOf() ? "text-green-800" : "text-black"
          }`
        )}
      >
        {promoCode?.valueOf() ? "Cupom aplicado" : promo.description}
      </Label>
    </div>
  );
};

export { CoupomCheckbox };
