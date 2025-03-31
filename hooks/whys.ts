import { IWhysItem } from "@/services/api/whys";
import whysMock from "@/mocks/whys.json";

export async function useWhys(): Promise<IWhysItem[]> {
  try {
    return await whysMock;
  } catch (error) {
    console.error("Erro ao buscar coberturas:", error);
    return [];
  }
}
