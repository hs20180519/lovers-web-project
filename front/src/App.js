import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountBookPage from "./pages/AccountBookPage";
import UserPage from "./pages/UserPage";
import DiaryPage from "./pages/DiaryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/accountbook/posts" element={<AccountBookPage />} />
        <Route path="/account/users" element={<UserPage />} />
        <Route path="/diary/posts" element={<DiaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
