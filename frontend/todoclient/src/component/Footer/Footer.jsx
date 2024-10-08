import React, { useState, useEffect, useContext } from "react";
import LinkBar from "../LinkBar";
import axiosInstance from "../../axiosConfig";
import { ThemeContext } from "../../App";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({ text: "" });
  const [error, setError] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);

  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      console.log("here");
      try {
        const res = await axiosInstance.get("/footer");
        console.log(res);
        setInfo({ text: res.data.text });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Can't load");
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`flex flex-col h-36 justify-center items-center ${
        theme === "light" ? "bg-gray-500" : "bg-gray-800"
      } space-y-4 py-2 h-[20%]`}
    >
      <LinkBar />
      <p className="font-roboto text-white">
        Copyright ©{year}, {isLoading ? "Loading" : error ? error : info.text}
      </p>
    </div>
  );
};

export default Footer;
