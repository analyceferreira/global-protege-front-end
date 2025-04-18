"use client";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionContainer } from "@/components/sectionContainer";
import { Company } from "@/components/company";
import { ICompaniesItem } from "@/services/api/companies";
import { getCompanies } from "@/hooks/companies";
import SectionTitle from "@/components/sectionTitle";

export function Companies() {
  const [companies, setCompanies] = React.useState<ICompaniesItem[]>([]);

  React.useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnFocusIn: false,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
    })
  );

  return (
    <SectionContainer>
      <SectionTitle title="Nossas empresas parceiras" />
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => plugin.current.play()}
        opts={{
          loop: true,
          skipSnaps: false,
          align: "start",
          dragFree: false,
          containScroll: "trimSnaps",
          inViewThreshold: 0.5,
        }}
      >
        <CarouselContent>
          {companies.map((company, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Company
                imageUrl={company.logoUrl}
                guaranteeBy={company.guaranteeBy}
                description={company.description}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-1/2 z-50" />
        <CarouselNext />
      </Carousel>
    </SectionContainer>
  );
}
