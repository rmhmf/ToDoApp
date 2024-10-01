import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage type="login" />} />
        <Route path="/register" element={<LoginPage type="register" />} />
      </Routes>
    </Router>
  );
}

export default App;
