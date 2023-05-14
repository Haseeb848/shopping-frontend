import React, { useEffect, useState } from "react";
import { decodeToken } from "./decodeTokken";
import AddProductComponent from "./addProduct";
import ViewProductComponent from "./viewProduct";
import { Routes, Route, useNavigate } from "react-router-dom";

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.role) {
        setUserRole(decodedToken.role);
        if (decodedToken.role === 'admin') {
          navigate('/dashboard/addProduct');
        } else {
          navigate('/dashboard/viewProduct');
        }
      }
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        {userRole === "admin" && <Route path="addProduct" element={<AddProductComponent />} />}
        <Route path="viewProduct" element={<ViewProductComponent />} />
      </Routes>
    </div>
  );
};

export default DashBoard;
