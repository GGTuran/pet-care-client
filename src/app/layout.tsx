import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";

export const metadata: Metadata = {
  title: "Dashboard - Pet Care",
  description: "Pet care Service Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Providers>
          <div className="mx-auto container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
