"use client";

import { useState } from "react";
import {
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switch";

interface MobileMenuProps {
  routeMap: Record<string, string>;
}

export function MobileMenuClient({ routeMap }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle between open/close states
  };

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
          <NavbarMenuItem>
            <Link href="/users">Users</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/about">About</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/contact-us">Contact</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href={routeMap.user}>Dashboard</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <ThemeSwitcher />
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </>
  );
}
