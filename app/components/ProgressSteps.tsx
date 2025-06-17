"use client";

import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store/store";

import { CycleCheckedIcon } from "@/public/icons/CycleChecked";
import { CycleIcon } from "@/public/icons/Cycle";

const steps = ["Client Information", "Services", "Review & Send"];

const ProgressSteps = () => {
  const { step } = useSelector((state: RootState) => state.appointment);

  return (
    <div className="w-[16.25rem] p-4 text-white bg-grayScale800 rounded-xl h-fit">
      <div className="flex flex-col gap-9">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === step;
          const isCompleted = stepNumber < step;

          return (
            <div key={label} className="relative flex gap-6">
              <div className="relative flex flex-col items-center">
                {isCompleted ? (
                  <CycleCheckedIcon />
                ) : isActive ? (
                  <CycleCheckedIcon />
                ) : (
                  <CycleIcon />
                )}

                {stepNumber !== steps.length && (
                  <div
                    className={`absolute top-full -translate-y-[0.75rem] h-12 w-px ${
                      isCompleted ? "bg-mainBlue" : "bg-grayScale500"
                    }`}
                  />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-grayScale500">
                  Step {stepNumber}
                </span>
                <span className="text-sm">{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
