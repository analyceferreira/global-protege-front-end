export interface IFAQItem {
  id: number;
  question: string;
  answer: string;
}

export async function getFAQ(): Promise<IFAQItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faq`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch {
    return [];
  }
}
