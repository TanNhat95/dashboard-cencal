"use client";

import React from "react";

import { BackLinkIcon } from "@/public/icons/BackLink";

const BackLink = () => {
  return (
    <div className="px-5 py-[0.875rem] bg-grayScale900 text-white border-b border-gray-700 h-[3.75rem] flex items-center gap-3">
      <BackLinkIcon />
      <h2 className="text-base font-bold">Create Appointment</h2>
    </div>
  );
};

export default BackLink;
