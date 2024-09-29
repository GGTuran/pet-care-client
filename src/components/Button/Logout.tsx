"use client";

import { Button } from "@nextui-org/react";
import { logout } from "@/services/AuthService";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout(); // Assume logout handles clearing JWT or session
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <Button onClick={handleLogout} color="primary" variant="flat">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
