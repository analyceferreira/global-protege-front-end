/* eslint-disable react-hooks/rules-of-hooks */
import { AppContainer } from "@/components/appContainer";
import { Card } from "@/components/card";
import SectionTitle from "@/components/sectionTitle";
import { useDestinations } from "@/hooks/destinations";
import { IDestinationsItem } from "@/services/api/destinations";
import React from "react";

const Destinations: React.FC = async () => {
  const destinations: IDestinationsItem[] = await useDestinations();

  const renderCards = () => {
    return destinations.map((destination) => (
      <Card
        key={destination.id}
        title={destination.title}
        description={destination.description}
        image={destination.image}
        imageAlt={destination.imageAlt}
      />
    ));
  };
  return (
    <AppContainer>
      <SectionTitle title="Por que contratar o seguro viagem para o meu destino?" />
      <div className="flex flex-row flex-wrap justify-between gap-y-6">
        {renderCards()}
      </div>
    </AppContainer>
  );
};

export { Destinations };
