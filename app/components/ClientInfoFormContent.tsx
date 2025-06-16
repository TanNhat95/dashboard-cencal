"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setStep,
  setIsSelectContactOpen,
} from "@/app/store/appointmentSlice";
import { RootState } from "@/app/store/store";
import AddContactModal from "./AddContactModal";
import SelectContactModal from "./SelectContactModal";
import * as yup from "yup";
import ProgressSteps from "./ProgressSteps";
import Label from "./LabelCustom";
import { PlusIcon } from "@/public/icons/Plus";

interface FormData {
  contact: string;
  year?: string;
  make?: string;
  model?: string;
  vehicleType?: string;
  note?: string;
}

const schema = yup.object().shape({
  contact: yup
    .string()
    .email("Must be a valid email")
    .required("Contact is required"),
  year: yup.string().required("Year is required"),
  make: yup.string().required("Make is required"),
  model: yup.string().required("Model is required"),
  vehicleType: yup.string().required("Vehicle Type is required"),
  note: yup
    .string()
    .min(10, "Note must be at least 10 characters")
    .notRequired(),
});

const ClientInfoFormContent = () => {
  const dispatch = useDispatch();
  const { formData, step } = useSelector(
    (state: RootState) => state.appointment
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(setFormData(data));
    if (step === 1) dispatch(setStep(2));
  };

  return (
    <div className="flex gap-4">
      <div className="bg-grayScale800 flex-1 p-4 rounded-xl text-white">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <Label required>Contact</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <select
                  {...register("contact")}
                  className="appearance-none w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                >
                  <option value="">Select contact</option>
                  <option value="contact1@gmail.com">Contact 1</option>
                  <option value="contact2@gmail.com">Contact 2</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.96l3.71-3.73a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => dispatch(setIsSelectContactOpen(true))}
                className="border-defaultBlue border text-white rounded-lg hover:opacity-70 flex items-center justify-center w-12 h-12"
              >
                <PlusIcon />
              </button>
            </div>
            {errors.contact && (
              <p className="text-error text-sm mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p>Vehicle Details</p>
            <div className="flex flex-col gap-6 p-3 border border-grayScale600 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>Year</Label>
                  <div className="relative">
                    <select
                      {...register("year")}
                      className="appearance-none w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    >
                      <option value="">Select year</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.96l3.71-3.73a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                      </svg>
                    </div>
                    {errors.year && (
                      <p className="text-error text-sm mt-1">
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label required>Make</Label>
                  <div className="relative">
                    <select
                      {...register("make")}
                      className="appearance-none w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    >
                      <option value="">Select make</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.96l3.71-3.73a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                      </svg>
                    </div>
                    {errors.make && (
                      <p className="text-error text-sm mt-1">
                        {errors.make.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label required>Model</Label>
                  <div className="relative">
                    <select
                      {...register("model")}
                      className="appearance-none w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    >
                      <option value="">Select model</option>
                      <option value="contact1@gmail.com">Camry</option>
                      <option value="contact2@gmail.com">Civic</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.96l3.71-3.73a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                      </svg>
                    </div>
                    {errors.model && (
                      <p className="text-error text-sm mt-1">
                        {errors.model.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label required>Vehicle Type</Label>
                  <div className="relative">
                    <select
                      {...register("vehicleType")}
                      className="appearance-none w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    >
                      <option value="">Select type</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.96l3.71-3.73a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                      </svg>
                    </div>
                    {errors.vehicleType && (
                      <p className="text-error text-sm mt-1">
                        {errors.vehicleType.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-blue-500 text-sm mt-2">
            Can't find a vehicle? Enter it manually.
          </p>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
            >
              Next
            </button>
          </div>
        </form>
        <AddContactModal />
        <SelectContactModal />
      </div>
      <ProgressSteps />
    </div>
  );
};

export default ClientInfoFormContent;
