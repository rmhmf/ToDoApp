import React from "react";
import LoginForm from "./component/LoginForm";

function LoginPage({ type }) {
  return (
    <div className="flex justify-center items-center h-screen bg-amber-300">
      <LoginForm type={type} />
    </div>
  );
}

export default LoginPage;
