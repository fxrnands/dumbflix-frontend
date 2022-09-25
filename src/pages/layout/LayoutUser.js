import React from "react";
import { Outlet } from "react-router-dom";
import NavbarUser from "../../components/Navbar/NavbarUser";

export default function LayoutUser() {
  return (
    <div>
      <NavbarUser />
      <Outlet />
    </div>
  );
}
