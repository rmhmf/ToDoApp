import React from "react";
import Form from "./Form";
import OAuth from "./OAuthForm";
import { Divider, Typography } from "@mui/material";

const LoginForm = (props) => {
  const { type } = props;
  const isLogin = type === "login";

  return (
    <div className="flex flex-col justify-center align-center border border-1 border-gray-300 shadow-md bg-white px-16 py-4 space-y-6">
      <div className="flex justify-center">
        <Typography variant="h5" align="center" className="font-roboto">
          {isLogin ? "Sign In" : "Sign Up"}
        </Typography>
      </div>

      <OAuth />

      <Divider>OR</Divider>

      <Form type={props.type} />
    </div>
  );
};

export default LoginForm;
