"use client";

import React from "react";

interface ClientInfoHeaderProps {
  step: number;
}

const ClientInfoHeader = ({ step }: ClientInfoHeaderProps) => {
  const getHeaderTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Client Information";
      case 2:
        return "Services";
      case 3:
        return "Review & Send";
      default:
        return "Client Information";
    }
  };

  return (
    <div className="text-white h-[3.25rem] flex items-center">
      <h2 className="text-2xl font-bold">{getHeaderTitle(step)}</h2>
    </div>
  );
};

export default ClientInfoHeader;
