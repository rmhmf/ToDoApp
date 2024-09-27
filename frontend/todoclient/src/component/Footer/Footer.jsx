import React from "react";
import LinkBar from "../LinkBar";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col h-48 justify-center items-center bg-gray-500 space-y-4 py-2 h-[20%]">
      <LinkBar />
      <p className="font-roboto text-white">
        Copyright ©{year}, Designed by Reza Mohammadi
      </p>
    </div>
  );
};

export default Footer;
