import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BasicDatePicker from "../BasicDatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig";

const Form = (props) => {
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
        const result = await axiosInstance.post("/login", {
          email: data.email,
          password: data.password,
        });
        console.log("result:", result);
        const newReq = await axiosInstance.get("/user");
        console.log("newReq", newReq);
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
      className="flex flex-col justify-center items-left space-y-3"
    >
      <p className="text-red-500 text-sm">
        {data.passErr
          ? "Password is too short"
          : data.confirmPassErr
          ? "Password not match"
          : ""}
      </p>
      <p className="text-red-500 text-sm">{data.serverError}</p>
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
          sx={{ width: "14rem" }}
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
  );
};

export default Form;
