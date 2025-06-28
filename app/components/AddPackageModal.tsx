"use client";

import React, { useState, useMemo } from "react";
import { FixedSizeList } from "react-window";

import Image from "next/image";

import { twMerge } from "tailwind-merge";

import CustomButton from "@/app/components/Button";

import { CancelIcon } from "@/public/icons/Cancel";
import { SearchIcon } from "@/public/icons/Search";
import { CheckIcon } from "@/public/icons/Check";

interface AddPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedPackages: { id: string; name: string }[]) => void;
}

const AddPackageModal: React.FC<AddPackageModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([]);

  // Generate 10,000 packages with random data
  const generatePackages = () => {
    const packages = [];
    const images = ["/film.png", "/car.png"];
    for (let i = 0; i < 10000; i++) {
      packages.push({
        id: `pkg_${i}`,
        name: `This is a Product Name ${i}`,
        price: i % 2 === 0 ? "$100.00" : "Start $100.00",
        estimatedTime: "2 hours",
        image: images[i % 2],
      });
    }
    return packages;
  };

  // Use useMemo to memoize packages and filteredPackages
  const packages = useMemo(() => generatePackages(), []);
  const filteredPackages = useMemo(
    () =>
      packages.filter((pkg) =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, packages]
  );

  const handleSelectPackage = (id: string) => {
    setSelectedPackageIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleConfirmSelection = () => {
    const selectedPackages = packages.filter((pkg) =>
      selectedPackageIds.includes(pkg.id)
    );
    onSelect(selectedPackages);
    onClose();
  };

  if (!isOpen) return null;

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const pkg = filteredPackages[index];
    const isSelected = selectedPackageIds.includes(pkg.id);

    if (!pkg) {
      return (
        <div
          style={style}
          className="flex items-center justify-center h-[60px] text-white"
        >
          Loading...
        </div>
      );
    }

    return (
      <div
        style={style}
        className={twMerge(
          "flex items-center justify-between p-2 border-b border-grayScale600 hover:bg-gray-700 transition-colors h-[60px]",
          isSelected && "bg-darkBlue"
        )}
      >
        <div className="flex items-center gap-2 w-[40%] min-w-[40%] pr-2">
          <Image
            src={pkg.image}
            alt={pkg.name}
            width={40}
            height={40}
            className="w-10 h-10"
            loading="lazy"
          />
          <span className="text-sm font-bold truncate">{pkg.name}</span>
        </div>
        <div className="w-[20%] min-w-[20%] text-sm text-center">
          {pkg.price}
        </div>
        <div className="w-[20%] min-w-[20%] text-sm text-center">
          {pkg.estimatedTime}
        </div>
        <div className="w-[20%] min-w-[20%] flex items-center justify-end pl-2">
          <div
            className={twMerge(
              "w-4 h-4 border border-gray-500 rounded flex items-center justify-center cursor-pointer",
              isSelected ? "bg-blue-600 border-blue-600" : "bg-gray-700"
            )}
            onClick={() => handleSelectPackage(pkg.id)}
          >
            {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-40 pb-[0.188rem]">
      <div className="flex flex-col gap-4 bg-grayScale800 h-svh px-6 pt-6 pb-[0.625rem] w-[69.563rem] rounded-r-xl">
        <div className="h-[1.875rem] flex justify-between">
          <h2 className="text-xl font-bold text-white">Add Package</h2>
          <CustomButton
            variant="icon"
            color="gray"
            isIconOnly
            icon={<CancelIcon />}
            onClick={onClose}
          />
        </div>

        <div className="flex h-[3.25rem] gap-4">
          <div className="relative flex-1 w-[66.563rem]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="pl-10 pr-4 py-3 bg-grayScale600 text-white rounded-lg h-full w-full focus:outline-none"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto flex-1 pt-4">
          <div className="overflow-hidden rounded-t-lg border border-grayScale600 h-full">
            <div className="bg-grayScale700 h-[3.75rem] flex items-center px-2 text-gray-400">
              <span className="w-[40%] min-w-[40%] font-semibold pr-2">
                Package Name
              </span>
              <span className="w-[20%] min-w-[20%] font-semibold text-center">
                Price
              </span>
              <span className="w-[20%] min-w-[20%] font-semibold text-center">
                Estimated Time
              </span>
              <span className="w-[20%] min-w-[20%] font-semibold text-right">
                Action
              </span>
            </div>
            <FixedSizeList
              height={600}
              width="100%"
              itemCount={filteredPackages.length}
              itemSize={60}
              className="overflow-y-auto text-white"
              key={searchTerm}
            >
              {Row}
            </FixedSizeList>
          </div>
        </div>

        <div className="flex justify-between h-12 items-center">
          <CustomButton
            variant="bordered"
            color="blue"
            size="h-12"
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant="filled"
            color="blue"
            size="h-12"
            onClick={handleConfirmSelection}
          >
            Selected ({selectedPackageIds.length})
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
