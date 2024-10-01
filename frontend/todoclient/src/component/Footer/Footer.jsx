import React, { useState, useEffect } from "react";
import LinkBar from "../LinkBar";
import axios from "axios";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);

  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      console.log("here");
      try {
        const res = await axios.get("http://localhost:3001/footer");
        setInfo(res.data);
        setIsLoading(false);
      } catch (err) {
        {
          setIsLoading(false);
          setError(err);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-36 justify-center items-center bg-gray-800 space-y-4 py-2 h-[20%]">
      <LinkBar />
      <p className="font-roboto text-white">
        Copyright ©{year}, {isLoading ? "Loading" : error ? error : info.text}
      </p>
    </div>
  );
};

export default Footer;
