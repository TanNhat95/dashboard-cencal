"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setIsAddContactOpen } from "@/app/store/appointmentSlice";

import { PlusIcon } from "@/public/icons/Plus";
import { CancelIcon } from "@/public/icons/Cancel";
import { SearchIcon } from "@/public/icons/Search";
import { CheckIcon } from "@/public/icons/Check";

interface SelectContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
  contacts: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    additionalPhone?: string;
    notes?: string;
  }[];
}

const SelectContactModal: React.FC<SelectContactModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  contacts,
}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  if (!isOpen) return null;

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  const handleSelectContact = () => {
    if (selectedContactId) {
      const contact = contacts.find((c) => c.id === selectedContactId);
      if (contact) {
        onSelect(contact);
        onClose();
      }
    }
  };

  const openAddContactModal = () => {
    dispatch(setIsAddContactOpen(true));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black text-white bg-opacity-50 flex items-center justify-end z-40 pb-[0.188rem]">
      <div className="flex flex-col gap-4 bg-grayScale800 h-svh px-6 pt-6 pb-[0.625rem] w-[69.563rem] rounded-r-xl">
        <div className="h-[1.875rem] flex justify-between">
          {/* Modal Title */}
          <h2 className="text-xl font-bold text-white">Contact</h2>
          {/* Close Button */}
          <button onClick={onClose} className="cursor-pointer">
            <CancelIcon />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex h-[3.25rem] gap-4">
          <div className="relative flex-1 w-[66.563rem]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone number or email"
              className="pl-10 pr-4 py-3 bg-grayScale600 text-white rounded-lg h-full w-full focus:outline-none"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button
            onClick={openAddContactModal}
            className="border border-blue-500 text-white rounded-lg hover:opacity-70 flex items-center justify-center w-[3.25rem] h-full cursor-pointer"
          >
            <PlusIcon />
          </button>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto flex-1 pt-4">
          <div className="overflow-hidden rounded-t-lg border border-grayScale600 h-full">
            <table className="w-full table-fixed">
              <thead className="h-[3.75rem] bg-grayScale700">
                <tr className="text-left text-gray-400 w-full">
                  <th className="font-semibold pl-3 rounded-tl-lg">Name</th>
                  <th className="font-semibold">Email</th>
                  <th className="font-semibold">Phone</th>
                  <th className="font-semibold pr-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact, index) => (
                  <tr
                    key={contact.id}
                    className={`border-b border-grayScale600 hover:bg-gray-700 transition-colors h-[3.75rem] ${
                      selectedContactId === contact.id ? "bg-darkBlue" : ""
                    } ${
                      index === filteredContacts.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="py-3 pl-3 text-sm font-bold">{`${contact.firstName} ${contact.lastName}`}</td>
                    <td className="py-3 text-sm">{contact.email}</td>
                    <td className="py-3 text-sm">{contact.phone}</td>
                    <td className="py-3 pr-3 flex items-center h-[3.75rem]">
                      <div
                        className={`w-4 h-4 border border-gray-500 rounded flex items-center justify-center cursor-pointer ${
                          selectedContactId === contact.id
                            ? "bg-blue-600 border-blue-600"
                            : "bg-gray-700"
                        }`}
                        onClick={() =>
                          setSelectedContactId(
                            selectedContactId === contact.id ? null : contact.id
                          )
                        }
                      >
                        {selectedContactId === contact.id && (
                          <CheckIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between h-12 items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSelectContact}
            disabled={!selectedContactId}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectContactModal;
