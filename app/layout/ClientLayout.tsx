"use client";

import Sidebar from "@/app/components/Sidebar";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="flex h-svh">
        <Sidebar className="border-r border-gray-700" />
        <main className="flex-1 bg-gradient-to-b from-blue-950 to-black border border-gray-700 flex overflow-scroll">
          <div className="flex-1">{children}</div>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Provider>
  );
}
