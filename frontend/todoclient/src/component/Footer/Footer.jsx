import React from "react";
import LinkBar from "../LinkBar";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col justify-center items-center bg-blue-500 space-y-4 py-2">
      <LinkBar />
      <p className="font-roboto text-white">
        Copyright ©{year}, Designed by Reza Mohmmadi
      </p>
    </div>
  );
};

export default Footer;
