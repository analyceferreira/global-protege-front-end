import { IFAQItem } from "@/services/api/faq";
import faqMock from "@/mocks/faq.json";

export async function useFAQ(): Promise<IFAQItem[]> {
  try {
    return await faqMock;
  } catch (error) {
    console.error("Erro ao buscar FAQ:", error);
    return [];
  }
}
