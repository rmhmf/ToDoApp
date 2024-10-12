import React from "react";
import Header from "../component/Header";
import Content from "../component/Content";
import Footer from "../component/Footer";

function MainPage() {
  console.log("main");
  return (
    <div className="min-h-screen flex flex-col">
      <Header page="main" />
      <Content />
      <Footer />
    </div>
  );
}

export default MainPage;
