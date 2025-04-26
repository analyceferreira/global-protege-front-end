/* eslint-disable react-hooks/rules-of-hooks */
import { SectionContainer } from "@/components/sectionContainer";
import { HomeCard } from "@/components/homeCard";
import SectionTitle from "@/components/sectionTitle";
import { useDestinations } from "@/hooks/destinations";
import { IDestinationsItem } from "@/services/api/destinations";
import React from "react";

const Destinations: React.FC = async () => {
  const destinations: IDestinationsItem[] = await useDestinations();

  const renderCards = () => {
    return destinations.map((destination) => (
      <HomeCard
        key={destination.id}
        title={destination.title}
        description={destination.description}
        image={destination.image}
        imageAlt={destination.imageAlt}
      />
    ));
  };
  return (
    <SectionContainer>
      <SectionTitle title="Por que contratar o seguro viagem para o meu destino?" />
      <div className="flex flex-row flex-wrap justify-between gap-y-2 md:gap-y-6">
        {renderCards()}
      </div>
    </SectionContainer>
  );
};

export { Destinations };
