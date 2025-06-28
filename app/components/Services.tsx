"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ProgressSteps from "@/app/components/ProgressSteps";
import Label from "@/app/components/LabelCustom";
import CustomButton from "@/app/components/Button";
import CustomContactSelect from "@/app/components/ContactSelect";
import { PlaceHolderPackageIcon } from "@/public/icons/PlaceholderPackage";
import AddPackageModal from "./AddPackageModal";

interface FormData {
  package: string;
  service: string;
  price: string;
  estimatedTime: string;
}

const schema = yup.object().shape({
  package: yup.string().required("Year is required"),
  service: yup.string().required("Make is required"),
  price: yup.string().required("Model is required"),
  estimatedTime: yup.string().required("Vehicle Type is required"),
});

const Services = () => {
  const { control } = useForm<FormData>({
    defaultValues: {
      package: "",
      service: "",
      price: "",
      estimatedTime: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState<
    { id: string; name: string }[]
  >([]);

  return (
    <div className="flex gap-4">
      <div className="bg-grayScale800 flex-1 p-4 rounded-xl text-white flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Label
            required
            classNames={{
              label: "text-sm font-bold",
            }}
          >
            Add Packages
          </Label>
          <CustomContactSelect
            control={control}
            name="package"
            placeholder="Search"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="flex-1 flex flex-col items-center gap-4">
          <PlaceHolderPackageIcon />
          <p>The selected packages will appear here</p>
          {selectedPackages.map((pkg) => (
            <div key={pkg.id}>{pkg.name}</div>
          ))}
        </div>

        <div className="flex justify-between h-12 items-center">
          <CustomButton variant="bordered" color="blue" size="h-12">
            Back
          </CustomButton>
          <CustomButton variant="filled" color="blue" size="h-12">
            Next
          </CustomButton>
        </div>
      </div>
      <ProgressSteps />
      <AddPackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={setSelectedPackages}
      />
    </div>
  );
};

export default Services;
