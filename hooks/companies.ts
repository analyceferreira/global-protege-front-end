import { ICompaniesItem } from "@/services/api/companies";
import companiesMock from "@/mocks/companies.json";

export async function useCompanies(): Promise<ICompaniesItem[]> {
  try {
    return await companiesMock;
  } catch (error) {
    console.error("Erro ao buscar coberturas:", error);
    return [];
  }
}
