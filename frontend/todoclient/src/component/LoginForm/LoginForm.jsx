import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BasicDatePicker from "../BasicDatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = (props) => {
  const { type } = props;

  const isLogin = type === "login";

  const [data, setData] = useState({
    email: "",
    password: "",
    check: false,
    confirmPass: "",
    birthDay: "",
    emailErr: false,
    passErr: false,
    confirmPassErr: false,
  });

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

  function checkEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(data.email);
  }

  function changed(event) {
    const { name, value } = event.target;
    const updatedPass = name === "password" ? value : data.password;
    const updatedEmail = name === "email" ? value : data.email;
    const updatedConfPass = name === "confirmPass" ? value : data.confirmPass;

    setData({
      ...data,
      [name]: value,
      passErr: updatedPass.length > 5 ? false : data.passErr,
      emailErr: checkEmail(updatedEmail) ? false : data.emailErr,
      confirmPassErr:
        data.password && updatedConfPass && data.password !== updatedConfPass
          ? true
          : false,
    });
  }

  function emailCurserOut() {
    setData({
      ...data,
      emailErr: !data.email || checkEmail(data.email) ? false : true,
    });
  }

  function passCurserOut() {
    setData({
      ...data,
      passErr: !data.password || data.password.length > 5 ? false : true,
    });
  }

  function check(event) {
    setData({
      ...data,
      check: event.target.checked,
    });
  }

  async function submit(event) {
    event.preventDefault();
    if (!isLogin) {
      const result = await axios.post("http://localhost:3001/register", {
        email: data.email,
        password: data.password,
        birthDay: data.birthDay,
      });
      console.log(result);
    }
  }

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

      <form
        onSubmit={submit}
        className="flex flex-col justify-center items-left space-y-2"
      >
        <TextField
          sx={{ width: "16rem" }}
          required
          id="email"
          name="email"
          type="email"
          error={data.emailErr}
          value={data.email}
          onChange={changed}
          onBlur={emailCurserOut}
          label="Email"
          variant="outlined"
        />
        <TextField
          sx={{ width: "16rem" }}
          required
          id="pass"
          name="password"
          value={data.password}
          error={data.passErr}
          onChange={changed}
          onBlur={passCurserOut}
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        {!isLogin && (
          <TextField
            sx={{ width: "16rem" }}
            required
            id="confirmPass"
            name="confirmPass"
            value={data.confirmPass}
            error={data.confirmPassErr}
            onChange={changed}
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
          />
        )}
        {!isLogin && (
          <BasicDatePicker
            value={data.birthDay}
            onChange={changed}
            sx={{ width: "16rem" }}
            required
          />
        )}
        {!isLogin && (
          <div className="w-full ml-.5">
            <FormControlLabel
              required
              onChange={check}
              control={<Checkbox checked={data.check} />}
              label="Accept Terms and Conditions"
            />
          </div>
        )}
        <Button
          sx={{ width: "16rem", textTransform: "none" }}
          variant="contained"
          type="submit"
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
      </form>
    </div>
  );
};

export default LoginForm;
