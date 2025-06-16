"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep } from "@/app/store/appointmentSlice";
import { RootState } from "@/app/store/store";
import ClientInfoHeader from "@/app/components/ClientInfoHeader";
import ClientInfoFormContent from "@/app/components/ClientInfoFormContent";
import BackLink from "./components/BackLink";

export default function Home() {
  const dispatch = useDispatch();
  const { step, formData } = useSelector(
    (state: RootState) => state.appointment
  );

  const handleBack = () => dispatch(setStep(step - 1));

  if (step === 2) {
    return (
      <div className="p-6 bg-gray-900 text-white">
        <ClientInfoHeader />
        <h2 className="text-2xl font-bold mb-4">Services - Step 2</h2>
        <div className="space-y-4">
          <p>Select services here...</p>
        </div>
        <div className="mt-6 space-x-4">
          <button
            onClick={handleBack}
            className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
          <button
            onClick={() => dispatch(setStep(3))}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="p-6 bg-gray-900 text-white">
        <ClientInfoHeader />
        <h2 className="text-2xl font-bold mb-4">Review & Send - Step 3</h2>
        <div className="space-y-4">
          <p>
            <strong>Contact:</strong> {formData.contact || "Not selected"}
          </p>
          <p>
            <strong>Year:</strong> {formData.year || "Not selected"}
          </p>
          <p>
            <strong>Make:</strong> {formData.make || "Not selected"}
          </p>
          <p>
            <strong>Model:</strong> {formData.model || "Not selected"}
          </p>
          <p>
            <strong>Vehicle Type:</strong>{" "}
            {formData.vehicleType || "Not selected"}
          </p>
          <p>
            <strong>Note:</strong> {formData.note || "None"}
          </p>
        </div>
        <div className="mt-6 space-x-4">
          <button
            onClick={handleBack}
            className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
          <button
            onClick={() => console.log("Appointment sent:", formData)}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <BackLink />
      <div className="flex flex-col gap-4 flex-1 px-4 py-6">
        <ClientInfoHeader />
        <ClientInfoFormContent />
      </div>
    </div>
  );
}
