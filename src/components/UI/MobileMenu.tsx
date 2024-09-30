/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switch";
import Logout from "../Button/Logout";
import { getCurrentUser } from "@/services/AuthService";

interface MobileMenuProps {
  routeMap: Record<string, string>;
}

export function MobileMenuClient({ routeMap }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState<any>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle between open/close states
  };

  useEffect(() => {
    const getUser = async () => {
      const result = await getCurrentUser();
      setUser(result);
    };
    getUser();
  }, []);

  console.log(user?.role, "nav user");

  return (
    <>
      {/* Mobile menu toggle button */}
      <NavbarMenuToggle
        aria-label="toggle navigation"
        className="sm:hidden"
        onClick={toggleMenu} // Only use onClick to toggle
      />

      {/* Conditionally render menu based on isMenuOpen state */}
      {isMenuOpen && (
        <NavbarMenu>
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
            <Link href="/feed">Feed</Link>
          </NavbarMenuItem>
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
            <Link href="/about">About</Link>
          </NavbarMenuItem>
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
            <Link href="/contact-us">Contact</Link>
          </NavbarMenuItem>
          {user?.role === "admin" ? (
            <NavbarMenuItem>
              <Link href={routeMap.admin}>Dashboard</Link>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem>
              <Link href={routeMap.user}>Dashboard</Link>
            </NavbarMenuItem>
          )}
          {user ? (
            <NavbarMenuItem>
              <Logout></Logout>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem
              onClick={() => setIsMenuOpen(false)}
              className="lg:flex"
            >
              <Link href="/login">Login</Link>
            </NavbarMenuItem>
          )}
          <NavbarMenuItem>
            <ThemeSwitcher />
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </>
  );
}
