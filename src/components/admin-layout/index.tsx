import Header from "@/components/admin-layout/header";
import Sidebar from "@/components/admin-layout/sidebar";
import React from "react";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1 pt-16">
          {children}
        </main>
      </div>
    </>
  );
};
