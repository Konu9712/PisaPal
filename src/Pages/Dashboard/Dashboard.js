import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    }
  }, []);
  const btnLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/sign-in");
  };
  return (
    <div>
      Dashboard
      <button onClick={(e) => btnLogout(e)}>Logout</button>
    </div>
  );
};
