import React, { useEffect, useState } from "react";
import { decodeToken } from "./decodeTokken";
import AddProductComponent from "./addProduct";
import ViewProductComponent from "./ViewProductComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
import MenuAppBar from "./Navbar";

interface DashBoardProps {}

const DashBoard = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.role) {
        setUserRole(decodedToken.role);
        if (decodedToken.role === "admin") {
          navigate("/add-products");
        } else {
          navigate("/all-products");
        }
      }
    }
  }, [navigate]);

  return (
    <div>
      <MenuAppBar /> {MenuAppBar}
      <Routes>
        {userRole === "admin" && (
          <Route path="add-products" element={<AddProductComponent />} />
        )}
        <Route path="all-products" element={<ViewProductComponent />} />
      </Routes>
    </div>
  );
};

export default DashBoard;
