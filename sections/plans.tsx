"use client";
import React, { useEffect, useState } from "react";
import { PlanCard } from "@/components/search/plan";
import { Plan } from "@/utils/types/plan";
import plansSeach from "@/mocks/seachPlans.json";
import { CheckIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PromoCode } from "@/utils/types/promo";

const plans: Plan[] = plansSeach;

type OrderType = "cost-benefit" | "lowest-price" | "best-coverage";

const PlansSection = () => {
  const [sortType, setSortType] = useState<OrderType>("cost-benefit");
  const [sortedPlans, setSortedPlans] = useState<Plan[]>([]);
  const [promoCodeApply, setPromoCodeApply] = useState<PromoCode | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const promoCode = localStorage.getItem("promoCode");
      if (promoCode) {
        setPromoCodeApply(JSON.parse(promoCode));
      }
    }
  }, []);

  useEffect(() => {
    let sorted: Plan[] = [];
    switch (sortType) {
      case "cost-benefit":
        sorted = [...plans].sort((a, b) => {
          return b.costBenefit - a.costBenefit;
        });
        break;
      case "lowest-price":
        sorted = [...plans].sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case "best-coverage":
        sorted = [...plans].sort((a, b) => {
          return b.costBenefit - a.costBenefit;
        });
        break;
    }
    setSortedPlans(sorted);
  }, [sortType]);

  const handleSortTypeChange = (value: OrderType) => {
    setSortType(value);
  };

  if (!sortedPlans || sortedPlans.length === 0) {
    return (
      <div className="w-full p-4 my-4 rounded-md border-1 border-stroke-light flex items-center justify-center">
        {" "}
        Nenhum resultado encontrado 😕
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 flex justify-between items-center flex-wrap gap-4 z-50">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Ordenar por:</span>
            <Select
              defaultValue={sortType}
              onValueChange={handleSortTypeChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="cost-benefit">
                  Melhor custo benefício
                </SelectItem>
                <SelectItem value="lowest-price">Menor preço</SelectItem>
                <SelectItem value="best-coverage">Maior cobertura</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {promoCodeApply && (
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Cupom:</span>
            <div className="flex items-center gap-1 text-green-600 font-medium">
              {promoCodeApply.name}
              <CheckIcon className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
      <div
        className="flex flex-col gap-2 items-center justify-center w-full p-4 my-4
                    rounded-md border-1 border-stroke-light"
      >
        {sortedPlans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            discountPercent={promoCodeApply?.percente}
            promoPaymentMethod={{
              paymentMethod: "PIX",
              discount: 10,
            }}
          />
        ))}
      </div>
    </>
  );
};

export { PlansSection };
