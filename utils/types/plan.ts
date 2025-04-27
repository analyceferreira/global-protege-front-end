// {
//   trip: Record<string, string | number | boolean>;
//   baggage: Record<string, string | number | boolean>;
//   medicalAssistance: Record<string, string | number | boolean>;
//   covid19: Record<string, string | number | boolean>;
//   repatriation: Record<string, string | number | boolean>;
//   fiancas?: Record<string, string | number | boolean>;
//   others?: Record<string, string | number | boolean>;
// };

export type PlanCovarageItem = {
  id: number;
  title: string;
  value: string | number | boolean;
  description?: string;
};

export type PlanCovarages = {
  id: number;
  title: string;
  description?: string;
  items: PlanCovarageItem[];
};

export type Plan = {
  id: number;
  company: string;
  logo: string;
  plan: string;
  ageRange: string;
  elderlyValue: string;
  price: number;
  medicalExpenses: number;
  baggageExpenses: number;
  valorComDesconto: number;
  costBenefit: number;
  coverages: PlanCovarages[];
};
