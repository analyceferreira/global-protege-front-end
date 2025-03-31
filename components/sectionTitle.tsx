import React from "react";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="w-full">
      <h1 className="text-primary font-bold text-2xl md:text-4xl text-center m-8 md:m-14">
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;
