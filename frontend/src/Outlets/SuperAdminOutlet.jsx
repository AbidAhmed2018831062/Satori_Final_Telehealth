import { Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function SuperAdminOutlet() {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(false);



  return (
    <Box>{Cookies.get("adminId")? <Outlet /> : <Navigate to="/adminlogin" />}</Box>
  );
}
