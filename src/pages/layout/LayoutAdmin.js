import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";

export default function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <Outlet />
    </div>
  );
}
