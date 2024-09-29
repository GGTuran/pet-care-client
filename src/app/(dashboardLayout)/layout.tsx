import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Pet Care",
  description: "Pet care Service Service",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen mx-auto container">
      Dashboard Navbar
      {children}
    </div>
  );
}
