import React from "react";
import { useParams } from "react-router-dom";
import Listfilm from "./listfilm";
import NavbarAdmin from "../../../components/Navbar/NavbarAdmin";

function Listfilms() {
  const params = useParams();
  return (
    <div>
      <NavbarAdmin />
      <Listfilm />
    </div>
  );
}

export default Listfilms;
