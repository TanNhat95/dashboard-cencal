"use client";

import React from "react";
import ProgressSteps from "./ProgressSteps";

const ReviewSend = () => {
  return (
    <div className="flex gap-4">
      <div className="bg-grayScale800 flex-1 p-4 rounded-xl text-white">
        Step 3
      </div>
      <ProgressSteps />
    </div>
  );
};

export default ReviewSend;
