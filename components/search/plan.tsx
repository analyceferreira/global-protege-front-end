"use client";

import { CheckIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlansCoveragesModal } from "./planCoverageModal";
import { cn } from "@/lib/utils";
import { Plan } from "@/utils/types/plan";

type PlanProps = {
  id?: string | undefined;
  plan: Plan;
  label?: "cost-benefit" | "lowest-price" | "best-coverage";
  discountPercent?: number;
  promoPaymentMethod: {
    paymentMethod: string;
    discount: number;
  };
};

const PlanCard = ({
  id,
  plan,
  label,
  discountPercent,
  promoPaymentMethod,
}: PlanProps) => {
  const [openCoverageModal, setOpenCoverageModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const openPlanCovaragesModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setOpenCoverageModal(true);
  };

  const formatDiscountValeu = (
    discount: number,
    paymentMethod: string
  ): string => {
    return `${discount}% OFF no ${paymentMethod}`;
  };

  const [labelDatails, setLabelDetails] = useState<
    | {
        text: string;
        color: string;
      }
    | undefined
  >();

  useEffect(() => {
    if (label === "cost-benefit" || plan.costBenefit)
      setLabelDetails({
        text: " Melhor custo benefício",
        color: "bg-green-600",
      });

    if (label === "lowest-price")
      setLabelDetails({ text: "Menor preço", color: "bg-blue-600" });

    if (label === "best-coverage")
      setLabelDetails({ text: "Maior cobertura", color: "bg-purple-600" });
  }, [label, plan]);

  const price = () => {
    if (!discountPercent) {
      return plan.price.toFixed(2);
    }
    const price = plan.price;
    const discountValue = (price * discountPercent) / 100;
    const discountedPrice = price - discountValue;
    return discountedPrice.toFixed(2);
  };

  return (
    <div
      id={id}
      className={`w-full flex flex-col justify-center gap-4 p-2 rounded-md border-1 border-stroke-light relative`}
    >
      {labelDatails && (
        <div
          className={cn(`absolute top-0 left-0 h-min rounded-sm overflow-clip shadow-md px-2 py-1
                  flex items-center text-sm text-white font-medium
                  ${labelDatails.color}
                  }`)}
        >
          <CheckIcon className="h-3 w-3 mr-1" />
          {labelDatails.text}
        </div>
      )}

      <div className="grid p-4 grid-cols-1 md:grid-cols-17">
        <div className="col-span-2 flex items-center justify-center">
          <Image
            src={plan.logo}
            alt={plan.company}
            width={140}
            height={140}
            className="md:w-full object-cover mb-2"
          />
        </div>
        <div className="col-span-1"></div>

        <div className="col-span-4 pt-2 md:pt-4">
          <div className="font-medium">{plan.plan}</div>
          <div className="text-sm text-gray-600">
            Faixa etária: {plan.ageRange}
          </div>
          <div className="text-sm text-gray-600">{plan.elderlyValue}</div>
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => openPlanCovaragesModal(plan)}
          >
            Ver a cobertura completa
          </button>
        </div>

        <div className="col-span-4 pt-2 md:pt-4">
          <div className="mb-2">
            <div className="font-medium">Despesa Médica e Hospitalar total</div>
            <div className="text-sm text-gray-600">
              USD{" "}
              {plan.medicalExpenses
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
          </div>
          <div>
            <div className="font-medium">Plan Bagagem</div>
            <div className="text-sm text-gray-600">
              USD{" "}
              {plan.baggageExpenses
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              (COMPLEMENTAR)
            </div>
          </div>
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-5 flex flex-col justify-center pt-4 md:pt-0">
          <div className="text-sm text-gray-600 flex gap-1">
            <p className="line-through text-nowrap">
              R$ {plan.price.toFixed(2)}
            </p>
            <p>em até 11x sem juros no cartão</p>
          </div>
          <div className="text-2xl font-bold flex md:flex-row gap-2 items-center">
            <p className="text-nowrap">R$ {price()}</p>
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md inline-block  md:max-w-fit h-fit">
              {formatDiscountValeu(
                promoPaymentMethod.discount,
                promoPaymentMethod.paymentMethod
              )}
            </div>
          </div>
          <div className="text-xs text-gray-600 mb-2">/preço por pessoa</div>

          <Button
            className="w-full bg-primary hover:bg-blue-950 text-white h-12 mt-2
                       active:bg-blue-950 active:text-accent-light 
                       focus:outline-none focus:ring-2 focus-within:ring-blue-600 "
            onClick={() => {}}
          >
            Selecionar Seguro
          </Button>
        </div>
      </div>
      {selectedPlan && (
        <PlansCoveragesModal
          isOpen={openCoverageModal}
          onClose={() => setOpenCoverageModal(false)}
          company={selectedPlan.company}
          plan={selectedPlan.plan}
          coverages={selectedPlan.coverages}
        />
      )}
    </div>
  );
};

export { PlanCard };
