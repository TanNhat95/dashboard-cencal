"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Label from "./LabelCustom";
import { CancelIcon } from "@/public/icons/Cancel";
import Input from "./Input";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").nullable().default(""),
  phone: Yup.string().nullable().default(""),
  additionalPhone: Yup.string().nullable().default(""),
  notes: Yup.string().nullable().default(""),
});

interface ContactFormData {
  name: string;
  email: string | null;
  phone: string | null;
  additionalPhone: string | null;
  notes: string | null;
}

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ContactFormData) => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      additionalPhone: "",
      notes: "",
    },
  });

  const email = watch("email");
  const phone = watch("phone");
  const additionalPhone = watch("additionalPhone");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isSubmitted && !email && !phone && !additionalPhone) {
      setFormError("Please enter at least one field: email or phone number.");
    } else {
      setFormError(null);
    }
  }, [email, phone, additionalPhone, isSubmitted]);

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        email: "",
        phone: "",
        additionalPhone: "",
        notes: "",
      });
      setFormError(null);
    } else if (!isOpen) {
      reset({
        name: "",
        email: "",
        phone: "",
        additionalPhone: "",
        notes: "",
      });
      setFormError(null);
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    const processedData = {
      ...data,
      email: data.email || null,
      phone: data.phone || null,
      additionalPhone: data.additionalPhone || null,
      notes: data.notes || null,
    };
    onSave(processedData);
    onClose();
  };

  const handleClose = () => {
    reset({
      name: "",
      email: "",
      phone: "",
      additionalPhone: "",
      notes: "",
    });
    setFormError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-grayScale800 p-6 rounded-xl text-white max-w-md w-[23.813rem] flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Contact</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <CancelIcon />
          </button>
        </div>

        {/* Title */}
        <p className="font-normal text-sm">
          Please enter at least one field: email or phone number.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label required>Name</Label>
            <Input name="name" control={control} placeholder="Name" />
            {errors.name && (
              <p className="text-error text-sm pt-2">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block">Email</label>
            <Input name="email" control={control} placeholder="Email" />
            {formError && (
              <p className="text-error text-sm pt-2">{formError}</p>
            )}
          </div>

          <div>
            <label className="block">Phone Number</label>
            <Input name="phone" control={control} placeholder="Phone number" />
            {formError && (
              <p className="text-error text-sm pt-2">{formError}</p>
            )}
          </div>

          <div>
            <label className="block">Additional Phone Number</label>
            <Input
              name="additionalPhone"
              control={control}
              placeholder="Phone number"
            />
            {formError && (
              <p className="text-error text-sm pt-2">{formError}</p>
            )}
          </div>

          <div>
            <label className="block">Note</label>
            <Input name="notes" control={control} placeholder="Enter" />
          </div>

          <div className="flex justify-between items-center h-20">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-3 border border-defaultBlue rounded-lg text-defaultBlue text-sm font-bold h-fit"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-3 bg-defaultBlue rounded-lg text-sm font-bold h-fit"
              disabled={!!formError || Object.keys(errors).length > 0}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
