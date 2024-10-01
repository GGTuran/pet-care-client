import Container from "@/components/UI/Container";
import NavBar from "@/components/UI/Navbar";
import Sidebar from "@/components/UI/Sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Pet Care",
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
        {" "}
        <NavBar />
      </div>
      <div>
        <Container>
          <div className="my-3 flex w-full gap-12">
            <div className="w-2/5">
              <Sidebar />
            </div>
            <div className="w-4/5">{children}</div>
          </div>
        </Container>
      </div>
    </div>
  );
}
