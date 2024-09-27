import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function LinkBar() {
  return (
    <div className="flex justify-center space-x-4">
      <a href="https://facebook.com">
        <FacebookIcon />
      </a>
      <a href="https://google.com">
        <GoogleIcon />
      </a>
      <a href="https://youtube.com">
        <YouTubeIcon />
      </a>
    </div>
  );
}
