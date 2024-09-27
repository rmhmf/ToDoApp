import React from "react";
import Header from "./component/Header";
import Content from "./component/Content";
import Footer from "./component/Footer";

function MainPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default MainPage;
