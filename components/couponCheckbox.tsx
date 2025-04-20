'use client';
import { cn } from "@/lib/utils"
import * as React from "react"
import { Label } from "@radix-ui/react-label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

const CoupomCheckbox = ({  }) => {
    const [hasCoupon, setHasCoupon ] = useState(false);

    React.useEffect(() => {
        localStorage.setItem("hasCoupon", JSON.stringify(hasCoupon));
    }
    , [hasCoupon]);


    return (
        <div className="flex items-center space-x-2">
        <Checkbox
          id="hasCoupon"
          checked={hasCoupon}
          onCheckedChange={(checked) =>
            setHasCoupon(checked as boolean)
          }
          className="border-black border-2 size-5 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
        />
        <Label
          htmlFor="hasCoupon"
          className={cn(
            `text-base font-medium ${
              hasCoupon.valueOf() ? "text-green-800" : "text-black"
            }`
          )}
        >
          {hasCoupon.valueOf()
            ? "Cupom de 20% de desconto aplicado"
            : "Aplicar cupom de 20% de desconto"}
        </Label>
      </div>
        )
}

export { CoupomCheckbox }