import React from "react";
import Form from "./Form";
import OAuth from "./OAuthForm";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const LoginForm = (props) => {
  const { type } = props;
  const isLogin = type === "login";

  return (
    <div className="shadow-md border-gray-200 bg-white p-4 space-y-2">
      <div className="flex justify-center">
        <h1 className="font-roboto font-bold">
          {isLogin ? "Login" : "Register"}
        </h1>
      </div>

      <OAuth />

      <Divider>
        <Chip label="Or" size="small" />
      </Divider>

      <Form type={props.type} />
    </div>
  );
};

export default LoginForm;
