import { ICoveragesItem } from "@/services/api/coverages";
import coveragesMock from "@/mocks/coverages.json";

export async function useCoverages(): Promise<ICoveragesItem[]> {
  try {
    return await coveragesMock;
  } catch (error) {
    console.error("Erro ao buscar coberturas:", error);
    return [];
  }
}
