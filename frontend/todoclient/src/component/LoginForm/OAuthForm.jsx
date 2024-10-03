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
    <div className="flex flex-col justify-center items-center space-y-2">
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
    </div>
  );
}

export default OAuth;
