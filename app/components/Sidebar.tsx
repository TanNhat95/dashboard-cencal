"use client";

import React, { useState } from "react";
import Link from "next/link";

import { AppointmentsIcon } from "@/public/icons/Appointments";
import { ProposalsIcon } from "@/public/icons/Proposals";
import { ServicesIcon } from "@/public/icons/Services";
import { VehicleRulesIcon } from "@/public/icons/VehicleRules";
import { InventoryIcon } from "@/public/icons/Inventory";
import { ContactsIcon } from "@/public/icons/Contacts";
import { TransactionsIcon } from "@/public/icons/Transactions";
import { InvoicesIcon } from "@/public/icons/Invoices";
import { ArrowLeftIcon } from "@/public/icons/ArrowLeft";
import { MainLogo } from "@/public/icons/MainLogo";

interface MenuItem {
  name: string;
  icon: React.ElementType;
  href: string;
  active: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Proposals", icon: ProposalsIcon, href: "#", active: false },
  { name: "Services", icon: ServicesIcon, href: "#", active: false },
  { name: "Vehicle Rules", icon: VehicleRulesIcon, href: "#", active: false },
  {
    name: "Appointments",
    icon: AppointmentsIcon,
    href: "/appointments/create",
    active: true,
  },
  { name: "Inventory", icon: InventoryIcon, href: "#", active: false },
  { name: "Contacts", icon: ContactsIcon, href: "#", active: false },
  { name: "Transactions", icon: TransactionsIcon, href: "#", active: false },
  { name: "Invoices", icon: InvoicesIcon, href: "#", active: false },
];

const Sidebar = () => {
  const [isManuallyCollapsed, setIsManuallyCollapsed] = useState(false);

  return (
    <div
      className={`relative bg-[#0D141C] flex flex-col transition-all duration-300 ease-in-out
        ${isManuallyCollapsed ? "w-20" : "w-20 md:w-[12.5rem]"}`}
    >
      {/* HEADER */}
      <header className="flex items-center justify-center h-[3.75rem] border-b border-neutral-700">
        <MainLogo />
      </header>

      {/* MAIN SIDEBAR (NAV) */}
      <nav className="flex-grow px-2">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center p-3 my-1 rounded-lg transition-colors
                  ${
                    item.active
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }
                  ${
                    isManuallyCollapsed
                      ? "justify-center md:justify-center"
                      : "justify-center md:justify-start"
                  }`}
                title={isManuallyCollapsed ? item.name : ""}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={`ml-3 whitespace-nowrap transition-all duration-200
                    ${
                      isManuallyCollapsed
                        ? "w-0 opacity-0 md:w-0 md:opacity-0"
                        : "w-0 opacity-0 md:w-auto md:opacity-100"
                    }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER */}
      <footer className="h-16 mt-auto border-t border-neutral-700 flex items-center px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            MA
          </div>
          <span
            className={`text-white font-semibold whitespace-nowrap transition-all duration-200
              ${
                isManuallyCollapsed
                  ? "w-0 opacity-0 md:w-0 md:opacity-0"
                  : "w-0 opacity-0 md:w-auto md:opacity-100"
              }`}
          >
            Micheal A.
          </span>
        </div>
      </footer>

      <button
        onClick={() => setIsManuallyCollapsed(!isManuallyCollapsed)}
        className="hidden md:block absolute top-1/2 -right-3 z-10 p-0 text-gray-400 hover:text-white"
        aria-label="Toggle sidebar"
      >
        <ArrowLeftIcon
          className={`transition-transform duration-300 ease-in-out
            ${isManuallyCollapsed ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    </div>
  );
};

export default Sidebar;
