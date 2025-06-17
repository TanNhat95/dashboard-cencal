"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setStep,
  setIsAddContactOpen,
  addManualVehicle,
  resetManualSaved,
  addContact,
} from "@/app/store/appointmentSlice";
import { RootState } from "@/app/store/store";
import ProgressSteps from "./ProgressSteps";
import Label from "./LabelCustom";
import { PlusIcon } from "@/public/icons/Plus";
import * as yup from "yup";
import { toast } from "react-toastify";
import ContactFormModal from "./ContactFormModal";
import Input from "./Input";
import Select from "./Select";
import { CancelRedIcon } from "@/public/icons/CancelRed";

interface FormData {
  contact: string;
  year: string;
  make: string;
  model: string;
  vehicleType: string;
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
});

const ClientInfoFormContent = () => {
  const dispatch = useDispatch();
  const {
    formData,
    availableVehicles,
    contacts,
    step,
    isManualSaved,
    isAddContactOpen,
  } = useSelector((state: RootState) => state.appointment);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const selectedContact = contacts.find((c) => c.email === formData.contact);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
    trigger, // Thêm trigger vào destructuring
  } = useForm<FormData>({
    defaultValues: formData,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const contactValue = watch("contact");

  // Cập nhật useEffect để kích hoạt validation khi contactValue thay đổi
  useEffect(() => {
    if (contactValue !== formData.contact) {
      dispatch(setFormData({ ...formData, contact: contactValue }));
      trigger("contact"); // Kích hoạt validation cho field contact
    }
  }, [contactValue, dispatch, formData, trigger]);

  useEffect(() => {
    if (isManualEntry) {
      setValue("year", "", { shouldValidate: false });
      setValue("make", "", { shouldValidate: false });
      setValue("model", "", { shouldValidate: false });
    } else {
      setValue("year", formData.year || "", { shouldValidate: false });
      setValue("make", formData.make || "", { shouldValidate: false });
      setValue("model", formData.model || "", { shouldValidate: false });
    }
  }, [isManualEntry, setValue, formData]);

  const handleSave: SubmitHandler<FormData> = (data) => {
    dispatch(setFormData(data));
    dispatch(
      addManualVehicle({
        year: data.year,
        make: data.make,
        model: data.model,
      })
    );
    toast.success("Vehicle saved successfully!", {
      position: "top-right",
    });
    reset({
      contact: data.contact,
      year: "",
      make: "",
      model: "",
      vehicleType: "",
    });
  };

  const handleNext: SubmitHandler<FormData> = (data) => {
    dispatch(setFormData(data));
    if (step === 1) dispatch(setStep(2));
  };

  const handleManualEntryToggle = () => {
    setIsManualEntry(!isManualEntry);
    dispatch(resetManualSaved());
  };

  const handleSaveContact = (contactData: {
    name: string;
    email: string | null;
    phone: string | null;
    additionalPhone: string | null;
    notes: string | null;
  }) => {
    const [firstName, ...lastNameParts] = contactData.name.split(" ");
    const lastName = lastNameParts.join(" ") || "";

    dispatch(
      addContact({
        id: Date.now().toString(),
        firstName,
        lastName,
        email: contactData.email || "",
        phone: contactData.phone || "",
        additionalPhone: contactData.additionalPhone || "",
        address: "",
        city: "",
        state: "",
        zip: "",
        notes: contactData.notes || "",
      })
    );

    toast.success("Contact added successfully!", {
      position: "top-right",
    });
  };

  useEffect(() => {
    if (step === 1) {
      dispatch(resetManualSaved());
    }
  }, [step, dispatch]);

  return (
    <div className="flex gap-4">
      <div className="bg-grayScale800 flex-1 p-4 rounded-xl text-white">
        <form className="flex flex-col gap-6">
          <div>
            <Label required>Contact</Label>
            {selectedContact ? (
              <div className="flex items-center gap-2 py-2 rounded">
                <span className="text-grayScale400 text-xs font-bold w-16">
                  Client
                </span>
                <span>
                  {selectedContact.firstName} {selectedContact.lastName}
                </span>
                |<span>{selectedContact.email}</span>|
                <span>{selectedContact.phone}</span>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setFormData({ ...formData, contact: "" }));
                    setValue("contact", "", { shouldValidate: true });
                  }}
                  className="text-error hover:text-red-700 font-bold"
                >
                  <CancelRedIcon />
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Select
                    name="contact"
                    control={control}
                    placeholder="Select contact"
                    options={contacts.map((contact) => ({
                      value: contact.email,
                      label: `${contact.firstName} ${contact.lastName} - ${contact.email}`,
                    }))}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(setIsAddContactOpen(true))}
                  className="border border-blue-500 text-white rounded-lg hover:opacity-70 flex items-center justify-center w-12 h-12"
                >
                  <PlusIcon />
                </button>
              </div>
            )}
            {errors.contact && (
              <p className="text-error text-sm mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* Phần còn lại của form giữ nguyên */}
          <div className="flex flex-col gap-4">
            <p>Vehicle Details</p>
            <div className="flex flex-col gap-6 p-3 border border-grayScale600 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>Year</Label>
                  <div className="relative">
                    {!isManualEntry ? (
                      <Select
                        name="year"
                        control={control}
                        placeholder="Select year"
                        options={availableVehicles.years.map((year) => ({
                          value: year,
                          label: year,
                        }))}
                      />
                    ) : (
                      <Input
                        name="year"
                        control={control}
                        placeholder="Enter year"
                      />
                    )}
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
                    {!isManualEntry ? (
                      <Select
                        name="make"
                        control={control}
                        placeholder="Select make"
                        options={availableVehicles.makes.map((make) => ({
                          value: make,
                          label: make,
                        }))}
                      />
                    ) : (
                      <Input
                        name="make"
                        control={control}
                        placeholder="Enter make"
                      />
                    )}
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
                    {!isManualEntry ? (
                      <Select
                        name="model"
                        control={control}
                        placeholder="Select model"
                        options={availableVehicles.models.map((model) => ({
                          value: model,
                          label: model,
                        }))}
                      />
                    ) : (
                      <Input
                        name="model"
                        control={control}
                        placeholder="Enter model"
                      />
                    )}
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
                    <Select
                      name="vehicleType"
                      control={control}
                      placeholder="Select type"
                      options={[
                        { value: "Sedan", label: "Sedan" },
                        { value: "SUV", label: "SUV" },
                      ]}
                    />
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

          <p
            className="text-blue-500 text-sm mt-2 cursor-pointer"
            onClick={handleManualEntryToggle}
          >
            {!isManualEntry
              ? "Can't find a vehicle? Enter it manually"
              : "I prefer to pick from the available Vehicle options"}
          </p>

          <div className="flex justify-end gap-2">
            {isManualEntry && (
              <button
                onClick={handleSubmit(handleSave)}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
              >
                Save
              </button>
            )}
            <button
              onClick={handleSubmit(handleNext)}
              disabled={isManualEntry && !isManualSaved}
              className={`px-6 py-3 rounded-lg font-semibold text-white ${
                isManualEntry && !isManualSaved
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <ProgressSteps />
      <ContactFormModal
        isOpen={isAddContactOpen}
        onClose={() => dispatch(setIsAddContactOpen(false))}
        onSave={handleSaveContact}
      />
    </div>
  );
};

export default ClientInfoFormContent;
