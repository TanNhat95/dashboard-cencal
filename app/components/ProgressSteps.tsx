"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { CheckIcon } from "@heroicons/react/24/outline";

const steps = ["Client Information", "Services", "Review & Send"];

const ProgressSteps = () => {
  const { step } = useSelector((state: RootState) => state.appointment);

  return (
    <div className="w-[16.25rem] p-4 text-white bg-grayScale800 rounded-xl h-full">
      <h3 className="text-lg font-semibold mb-4">Steps</h3>
      <div className="relative">
        <div
          className="absolute left-3.5 top-0 bottom-0 w-1 bg-gray-600"
          style={{ height: "calc(100% - 2rem)" }}
        ></div>
        {steps.map((label, index) => {
          const isActive = index + 1 === step;
          const isCompleted = index + 1 < step;
          return (
            <div key={label} className="relative mb-6 flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? "bg-blue-500 border-blue-500"
                    : isActive
                    ? "bg-blue-600 border-blue-600"
                    : "bg-gray-700 border-gray-700"
                }`}
              >
                {isCompleted && <CheckIcon className="w-5 h-5 text-white" />}
                {!isCompleted && <span className="text-sm">{index + 1}</span>}
              </div>
              <span className="ml-4 text-sm">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
