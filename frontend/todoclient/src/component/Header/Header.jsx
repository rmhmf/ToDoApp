import React from "react";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <div className="flex justify-between text-white bg-blue-500 border-blue-600 border-b p-4 rounded-sm">
      <h1 className="font-roboto font-bold text-3xl ml-4">Welcome</h1>
      <div className="flex space-x-2 mr-4">
        <Button variant="outlined">Login</Button>
        <Button variant="contained">Sign in</Button>
      </div>
    </div>
  );
}
