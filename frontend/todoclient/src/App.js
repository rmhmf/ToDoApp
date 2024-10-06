import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage type="login" />} />
          <Route path="/register" element={<LoginPage type="register" />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
export { ThemeContext };
