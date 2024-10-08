import Footer from "@/components/UI/Footer";
import NavBar from "@/components/UI/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed | Pawprints & Tales",
  description: "Pet care  Service",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen mx-auto"> {children}</div>
      <Footer></Footer>
    </div>
  );
}
