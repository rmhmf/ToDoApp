import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../component/LoginForm";
import axiosInstance from "../axiosConfig";

function LoginPage({ type }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = async () => {
      try {
        await axiosInstance.get("/user/verify");
        navigate("/user");
      } catch (err) {}
    };
    isAuth();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-amber-300">
      <LoginForm type={type} />
    </div>
  );
}

export default LoginPage;
