import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BasicDatePicker from "../BasicDatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const { type } = props;

  const isLogin = type === "login";

  const GoogleIcon = () => {
    return (
      <img
        className="h-5"
        src="https://cdn.overleaf.com/img/other-brands/logo_google.svg"
        aria-hidden="true"
        alt="google"
      />
    );
  };

  return (
    <div className="shadow-md border-gray-200 bg-white p-4 space-y-2">
      <div className="flex justify-center">
        <h1 className="font-roboto font-bold">
          {isLogin ? "Login" : "Register"}
        </h1>
      </div>

      <div>
        <Button
          sx={{
            width: "16rem",
            textTransform: "none",
            color: "black",
          }}
          variant="outlined"
        >
          <div className="flex w-full items-center space-x-4 ml-4">
            <GoogleIcon />
            <span>Continue with Google</span>
          </div>
        </Button>
      </div>

      <div>
        <Button
          sx={{
            width: "16rem",
            textTransform: "none",
            color: "white",
            backgroundColor: "#3b5998",
          }}
          variant="outlined"
        >
          <div className="flex w-full items-center space-x-4 ml-4">
            <FacebookRoundedIcon
              sx={{
                color: "white",
                borderRadius: "50%",
                margin: "0",
                padding: "0",
              }}
            />
            <span>Continue with Facebook</span>
          </div>
        </Button>
      </div>

      <div className="flex items-center my-2 color-gray-500">
        <hr className="flex-1 border-black" />
        <span className="px-2"> OR </span>
        <hr className="flex-1 border-black" />
      </div>

      <div className="flex flex-col justify-center items-left space-y-2">
        <TextField
          sx={{ width: "16rem" }}
          required
          id="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          sx={{ width: "16rem" }}
          required
          id="pass"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        {!isLogin && (
          <TextField
            sx={{ width: "16rem" }}
            required
            id="confirmPass"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
          />
        )}
        {!isLogin && <BasicDatePicker sx={{ width: "16rem" }} required />}
        {!isLogin && (
          <div className="w-full ml-.5">
            <FormControlLabel required control={<Checkbox />} label="Accept" />
          </div>
        )}
        <Button
          sx={{ width: "16rem", textTransform: "none" }}
          variant="contained"
        >
          {isLogin ? "Login" : "Register"}
        </Button>

        {isLogin ? (
          <p className="text-sm">
            Don't have an account? <Link to="/register">Register page</Link>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account? <Link to="/login">Login page</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
