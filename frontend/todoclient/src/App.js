import React from "react";
import Header from "./component/Header";
import LoginForm from "./component/LoginForm";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow  justify-center items-center">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default App;
