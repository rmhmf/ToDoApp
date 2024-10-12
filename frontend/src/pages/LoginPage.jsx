import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
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
    <Container
      maxWidth="full"
      className="flex flex-col w-full justify-center items-center h-screen m-0"
    >
      <LoginForm type={type} />
    </Container>
  );
}

export default LoginPage;
