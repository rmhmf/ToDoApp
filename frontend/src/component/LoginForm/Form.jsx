import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";

const Form = (props) => {
  const { type } = props;
  const navigate = useNavigate();

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
    serverError: "",
  });

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
      try {
        await axiosInstance.post("/register", {
          email: data.email,
          password: data.password,
          birthDay: data.birthDay,
        });
      } catch (err) {
        setData({
          ...data,
          serverError: err.response.data.error,
        });
      }
    } else {
      try {
        await axiosInstance.post("/login", {
          email: data.email,
          password: data.password,
        });
        navigate("/user");
      } catch (err) {
        setData({
          ...data,
          serverError: err.response.data.error,
        });
      }
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col justify-center items-left space-y-2 w-full"
    >
      {(data.passErr || data.confirmPassErr) && (
        <Typography className="text-red-500 text-sm">
          {data.passErr
            ? "Password is too short"
            : data.confirmPassErr
            ? "Password not match"
            : null}
        </Typography>
      )}
      {data.serverError && (
        <Typography className="text-red-500 text-sm">
          {data.serverError}
        </Typography>
      )}
      <TextField
        className="w-full"
        size="small"
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
        className="w-full"
        size="small"
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
          className="w-full"
          size="small"
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
        <div className="w-full ml-.5">
          <FormControlLabel
            required
            onChange={check}
            control={<Checkbox checked={data.check} />}
            label={<span className="text-sm">Accept Terms and Conditions</span>}
          />
        </div>
      )}
      <Button
        className="w-72"
        size="small"
        sx={{ textTransform: "none" }}
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
  );
};

export default Form;
