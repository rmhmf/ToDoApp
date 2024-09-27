import React from "react";
import Button from "@mui/material/Button";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function loginClicked() {
    navigate("/login");
  }
  return (
    <div className="flex h-24 justify-between bg-amber-300 border-amber-400 border-b p-4 rounded-sm shadow-sm space-y-2 py-1 flex-col sm:flex-row">
      <div className="flex items-center space-x-2 ml-4">
        <EventNoteIcon />
        <p className="font-roboto text-gray-500 font-bold text-3xl">
          Sticky Note
        </p>
      </div>

      <div className="flex items-center space-x-2 mr-4">
        <Button onClick={loginClicked} variant="outlined">
          Login
        </Button>
        <Button variant="contained">Register</Button>
      </div>
    </div>
  );
}
