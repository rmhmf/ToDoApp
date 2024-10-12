import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Button from "@mui/material/Button";

function OAuth() {
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
    <div className="flex flex-col justify-center items-center space-y-2 w-full">
      <Button
        size="small"
        className="w-full"
        sx={{
          textTransform: "none",
          color: "black",
        }}
        variant="outlined"
      >
        <div className="flex w-full items-center ml-6">
          <GoogleIcon />
          <span className="w-full flex justify-center">
            Continue with Google
          </span>
        </div>
      </Button>

      <Button
        className="w-72"
        size="small"
        sx={{
          textTransform: "none",
          color: "white",
          backgroundColor: "#3b5998",
        }}
        variant="outlined"
      >
        <div className="flex w-full items-center ml-6">
          <FacebookRoundedIcon
            sx={{
              color: "white",
              borderRadius: "50%",
              margin: "0",
              padding: "0",
            }}
          />
          <span className="flex w-full justify-center">
            Continue with Facebook
          </span>
        </div>
      </Button>
    </div>
  );
}

export default OAuth;
