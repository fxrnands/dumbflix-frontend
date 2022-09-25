import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAuth from "../../components/Navbar/NavbarAuth";

export default function LayoutAuth() {
  return (
    <div>
      <NavbarAuth />
      <Outlet />
    </div>
  );
}
