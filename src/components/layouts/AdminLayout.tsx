import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="section-box-w section-py grid gap-5">{children}</div>;
}
