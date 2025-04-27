import { Plan } from "@/utils/types/plan";

export async function getPlans(filters: unknown): Promise<Plan[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/plans${filters}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch {
    return [];
  }
}
