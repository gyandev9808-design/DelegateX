import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin & Secretariat Panel - DelegateX",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
