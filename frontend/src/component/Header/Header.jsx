import React from "react";
import Button from "@mui/material/Button";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";

export default function Header(props) {
  const navigate = useNavigate();

  function loginClicked() {
    navigate("/login");
  }

  function registerClicked() {
    navigate("/register");
  }

  async function logoutClicked() {
    try {
      await axiosInstance.post("/logout", {});
    } catch (err) {
      navigate("/user");
    }
    navigate("/");
  }
  return (
    <div className="flex h-24 justify-between bg-amber-300 border-amber-400 border-b p-4 rounded-sm shadow-sm space-y-2 py-1 flex-col sm:flex-row">
      <div className="flex items-center space-x-2 ml-4">
        <EventNoteIcon />
        <p className="font-roboto text-gray-500 font-bold text-3xl">
          {props.page === "main" ? "Sticky Note" : props.email}
        </p>
      </div>

      <div className="flex items-center space-x-2 mr-4">
        {props.page === "main" ? (
          <>
            <Button onClick={loginClicked} variant="outlined">
              Login
            </Button>
            <Button onClick={registerClicked} variant="contained">
              Register
            </Button>
          </>
        ) : (
          <Button onClick={logoutClicked} variant="contained">
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
