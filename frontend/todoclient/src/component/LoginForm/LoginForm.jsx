import React from "react";
import Form from "./Form";
import OAuth from "./OAuthForm";

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

      <div className="flex items-center my-2 color-gray-500">
        <hr className="flex-1 border-black" />
        <span className="px-2"> OR </span>
        <hr className="flex-1 border-black" />
      </div>

      <Form type={props.type} />
    </div>
  );
};

export default LoginForm;
