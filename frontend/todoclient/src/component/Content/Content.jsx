import React from "react";
import Button from "@mui/material/Button";
import sticks from "../../assets/sticks.png";

function Content() {
  return (
    <div className="flex bg-amber-100 flex-grow flex-col sm:flex-row">
      <div className="flex justify-center items-center sm:w-1/2 p-4">
        <div className="flex-inline flex-col space-y-4 font-roboto">
          <h2 className="font-bold text-4xl">Organize yourself efficiently</h2>
          <p>
            Hold your notes, plans, and ideas in your pocket.
            <br /> Enjoy modern design and much more ...
          </p>
          <Button variant="contained">Sing up free</Button>
        </div>
      </div>
      <div className="flex justify-center sm:justify-left items-center sm:w-1/2">
        <img className="w-4/5" src={sticks} alt="sticks" />
      </div>
    </div>
  );
}

export default Content;
