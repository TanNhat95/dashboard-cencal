"use client";

import Sidebar from "@/app/components/Sidebar";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="flex h-screen">
        <Sidebar className="border-r border-gray-700" />
        <main className="flex-1 bg-gradient-to-b from-blue-950 to-black border border-gray-700 flex">
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </Provider>
  );
}
