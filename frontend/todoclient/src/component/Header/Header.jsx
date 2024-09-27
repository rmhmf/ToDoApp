import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between text-white bg-blue-500 border-blue-600 border-b p-4 rounded-sm">
      <h1 className="font-roboto font-bold text-3xl ml-4">Welcome</h1>
      <input className="mr-4" type="button" value="Login / SignUp" />
    </div>
  );
}
