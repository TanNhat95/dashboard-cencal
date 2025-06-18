"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setStep,
  setIsAddContactOpen,
  addManualVehicle,
  setIsSelectContactOpen,
} from "@/app/store/appointmentSlice";
import { RootState } from "@/app/store/store";
import ProgressSteps from "./ProgressSteps";
import Label from "./LabelCustom";
import { PlusIcon } from "@/public/icons/Plus";
import { CancelRedIcon } from "@/public/icons/CancelRed";
import * as yup from "yup";
import { toast } from "react-toastify";
import Input from "./Input";
import Select from "./Select";
import CustomContactSelect from "./ContactSelect";
import { debounce } from "lodash";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalPhone?: string;
  notes?: string;
}

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
  const { formData, availableVehicles, contacts, step } = useSelector(
    (state: RootState) => state.appointment
  );
  const [isManualEntry, setIsManualEntry] = useState(false);
  const selectedContact = useMemo(
    () => contacts.find((c: Contact) => c.email === formData.contact),
    [contacts, formData.contact]
  ) as Contact | undefined;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      contact: formData.contact || "",
      year: formData.year || "",
      make: formData.make || "",
      model: formData.model || "",
      vehicleType: formData.vehicleType || "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const yearValue = watch("year");
  const makeValue = watch("make");
  const modelValue = watch("model");
  const isManualFieldsValid = isManualEntry
    ? !!yearValue &&
      !!makeValue &&
      !!modelValue &&
      !errors.year &&
      !errors.make &&
      !errors.model
    : true;

  useEffect(() => {
    const debouncedSetFormData = debounce((data) => {
      dispatch(setFormData(data));
    }, 300);

    const subscription = watch((value) => {
      debouncedSetFormData(value);
    });

    return () => {
      subscription.unsubscribe();
      debouncedSetFormData.cancel();
    };
  }, [watch, dispatch]);

  useEffect(() => {
    if (formData.contact !== watch("contact")) {
      setValue("contact", formData.contact || "", { shouldValidate: true });
    }
    if (formData.year !== watch("year")) {
      setValue("year", formData.year || "", { shouldValidate: false });
    }
    if (formData.make !== watch("make")) {
      setValue("make", formData.make || "", { shouldValidate: false });
    }
    if (formData.model !== watch("model")) {
      setValue("model", formData.model || "", { shouldValidate: false });
    }
    if (formData.vehicleType !== watch("vehicleType")) {
      setValue("vehicleType", formData.vehicleType || "", {
        shouldValidate: false,
      });
    }
  }, [formData, setValue, watch]);

  // Xử lý isManualEntry
  useEffect(() => {
    if (isManualEntry) {
      if (!watch("year")) setValue("year", "", { shouldValidate: false });
      if (!watch("make")) setValue("make", "", { shouldValidate: false });
      if (!watch("model")) setValue("model", "", { shouldValidate: false });
    } else {
      if (formData.year && formData.year !== watch("year")) {
        setValue("year", formData.year, { shouldValidate: false });
      }
      if (formData.make && formData.make !== watch("make")) {
        setValue("make", formData.make, { shouldValidate: false });
      }
      if (formData.model && formData.model !== watch("model")) {
        setValue("model", formData.model, { shouldValidate: false });
      }
    }
  }, [isManualEntry, setValue, formData, watch]);

  const handleNext: SubmitHandler<FormData> = (data) => {
    console.log(data);
    dispatch(setFormData(data));
    if (isManualEntry) {
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
    }
    if (step === 1) dispatch(setStep(2));
  };

  const handleManualEntryToggle = () => {
    setIsManualEntry(!isManualEntry);
    if (!isManualEntry) {
      setValue("year", "", { shouldValidate: false });
      setValue("make", "", { shouldValidate: false });
      setValue("model", "", { shouldValidate: false });
    } else {
      setValue("year", formData.year || "", { shouldValidate: false });
      setValue("make", formData.make || "", { shouldValidate: false });
      setValue("model", formData.model || "", { shouldValidate: false });
    }
  };

  const handleOpenSelectContactModal = () => {
    dispatch(setIsSelectContactOpen(true));
  };

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
                    setValue("contact", "", { shouldValidate: true });
                    dispatch(setFormData({ contact: "" }));
                  }}
                  className="text-error hover:text-red-700 font-bold"
                >
                  <CancelRedIcon />
                </button>
              </div>
            ) : (
              <div className="relative flex items-center space-x-2">
                <div className="flex-1">
                  <CustomContactSelect
                    name="contact"
                    control={control}
                    placeholder="Select contact"
                    onClick={handleOpenSelectContactModal}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(setIsAddContactOpen(true))}
                  className="border border-blue-500 text-white rounded-lg hover:opacity-70 flex items-center justify-center w-12 h-12 cursor-pointer"
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
            className="text-blue-500 text-sm mt-2 cursor-pointer w-fit"
            onClick={handleManualEntryToggle}
          >
            {!isManualEntry
              ? "Can't find a vehicle? Enter it manually"
              : "I prefer to pick from the available Vehicle options"}
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleSubmit(handleNext)}
              disabled={!isValid || (isManualEntry && !isManualFieldsValid)}
              className={`p-3 rounded-lg font-bold text-white text-sm h-12 w-[3.875rem] ${
                isValid && (!isManualEntry || isManualFieldsValid)
                  ? "bg-mainBlue hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <ProgressSteps />
    </div>
  );
};

export default ClientInfoFormContent;
