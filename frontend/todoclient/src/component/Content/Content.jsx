import React from "react";
import Button from "@mui/material/Button";

function Content() {
  return (
    <div className="flex flex-grow">
      <div className="flex justify-center items-center w-1/2">
        <div className="flex-inline flex-col space-y-4 font-roboto">
          <h2 className="font-bold text-3xl">Organize yourself efficiently</h2>
          <p>
            Hold your notes, plans, and ideas in your pocket.
            <br /> Enjoy modern design and much more ...
          </p>
          <Button variant="contained">Sing up free</Button>
        </div>
      </div>
      <div className="flex justify-left items-center w-1/2">
        <img
          className="w-4/5"
          src="https://s3-alpha.figma.com/hub/file/4512334802/659e8d64-4c73-4e3e-b07c-5e8e3d76f180-cover.png"
          alt="image of sticks"
        />
      </div>
    </div>
  );
}

export default Content;
