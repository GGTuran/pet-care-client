import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switch";
import { MobileMenuClient } from "./MobileMenu";
import { getCurrentUser } from "@/services/AuthService";
import Logout from "../Button/Logout";

export default async function NavBar() {
  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/admin-dashboard",
  };

  const user = await getCurrentUser();
  console.log(user?.role, "nav");

  return (
    <Navbar maxWidth="2xl">
      <NavbarBrand>
        <Link className="flex" href="/">
          <PawPrint />
          <p className="font-bold text-inherit px-4">Coo Coo House</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="/feed">
            Feed
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact-us">
            Contact
          </Link>
        </NavbarItem>
        {user?.role === "admin" ? (
          <NavbarItem>
            <Link href={routeMap.admin}>Dashboard</Link>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Link href={routeMap.user}>Dashboard</Link>
          </NavbarItem>
        )}
        {user ? (
          <NavbarItem>
            <Logout></Logout>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <MobileMenuClient routeMap={routeMap} />{" "}
    </Navbar>
  );
}
