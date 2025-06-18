"use client";

import React from "react";
import ProgressSteps from "./ProgressSteps";

const Services = () => {
  return (
    <div className="flex gap-4">
      <div className="bg-grayScale800 flex-1 p-4 rounded-xl text-white">
        Step 2
      </div>
      <ProgressSteps />
    </div>
  );
};

export default Services;
