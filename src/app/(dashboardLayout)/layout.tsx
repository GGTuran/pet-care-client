import Dashboard from "@/components/UI/Dashboard/Dashboard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Pawprints & Tales",
  description: "Pet care Service Service",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <div className="my-3 flex w-full gap-12">
          <div className="">
            <Dashboard />
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
