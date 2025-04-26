import React from "react";
import { PlanCard } from "@/components/search/plan";
import { Plan } from "@/utils/types/plan";
import plansSeach from "@/mocks/seachPlans.json";

const PlansSection = () => {
  const plans: Plan[] = plansSeach;
  return (
    <div
      className="flex flex-col gap-2 items-center justify-center w-full p-4 my-4
                    rounded-md border-1 border-stroke-light"
    >
      {plans.map((plan, index) => (
        <PlanCard
          key={index}
          plan={plan}
          promoPaymentMethod={{
            paymentMethod: "PIX",
            discount: 10,
          }}
        />
      ))}
    </div>
  );
};

export { PlansSection };
