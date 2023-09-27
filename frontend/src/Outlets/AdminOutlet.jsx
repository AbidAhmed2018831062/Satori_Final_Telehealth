import { Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminOutlet() {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(false);



  return (
    <Box>{(Cookies.get("id")&&Cookies.get("subscription")!==-1)? <Outlet /> :Cookies.get("id")?<Navigate to="/admin/onboarding/plan"></Navigate>: <Navigate to="/register" />}</Box>
  );
}
