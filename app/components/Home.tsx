"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  addContact,
  setIsAddContactOpen,
  setIsSelectContactOpen,
} from "@/app/store/appointmentSlice";
import { RootState } from "@/app/store/store";
import ClientInfoHeader from "@/app/components/ClientInfoHeader";
import ClientInfoFormContent from "@/app/components/ClientInfoFormContent";
import Services from "@/app/components/Services";
import ReviewSend from "@/app/components/ReviewSend";
import BackLink from "@/app/components/BackLink";
import ContactFormModal from "@/app/components/ContactFormModal";
import SelectContactModal from "@/app/components/SelectContactModal";

interface ContactFormData {
  name: string;
  email: string | null;
  phone: string | null;
  additionalPhone: string | null;
  notes: string | null;
}

export default function Home() {
  const dispatch = useDispatch();
  const { step, isAddContactOpen, isSelectContactOpen, contacts } = useSelector(
    (state: RootState) => state.appointment
  );

  const handleAddContact = (data: ContactFormData) => {
    const [firstName, ...lastNameParts] = data.name.split(" ");
    const lastName = lastNameParts.join(" ") || "";
    const email = data.email || "";
    dispatch(
      addContact({
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        phone: data.phone || "",
        additionalPhone: data.additionalPhone || "",
        notes: data.notes || "",
      })
    );
    dispatch(setFormData({ contact: email }));
    dispatch(setIsAddContactOpen(false));
  };

  const handleSelectContact = (contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    dispatch(setFormData({ contact: contact.email || "" }));
    dispatch(setIsSelectContactOpen(false));
  };

  return (
    <div className="flex flex-col h-full">
      <BackLink />
      <div className="flex flex-col gap-4 flex-1 px-4 py-6">
        <ClientInfoHeader step={step} />
        {step === 1 && <ClientInfoFormContent />}
        {step === 2 && <Services />}
        {step === 3 && <ReviewSend />}
      </div>
      <ContactFormModal
        isOpen={isAddContactOpen}
        onClose={() => dispatch(setIsAddContactOpen(false))}
        onSave={handleAddContact}
      />
      <SelectContactModal
        isOpen={isSelectContactOpen}
        onClose={() => dispatch(setIsSelectContactOpen(false))}
        onSelect={handleSelectContact}
        contacts={contacts}
      />
    </div>
  );
}
