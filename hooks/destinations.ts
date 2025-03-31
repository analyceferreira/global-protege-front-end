import { IDestinationsItem } from "@/services/api/destinations";
import destinationsMock from "@/mocks/destinations.json";

export async function useDestinations(): Promise<IDestinationsItem[]> {
  try {
    return await destinationsMock;
  } catch (error) {
    console.error("Erro ao buscar coberturas:", error);
    return [];
  }
}
