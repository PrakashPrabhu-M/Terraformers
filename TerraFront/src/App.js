import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./pages/Shared/Header/Header";
import LoginPage from "./pages/LandingPage/LoginPage";
import RegisterPage from "./pages/LandingPage/RegisterPage";
import Dashboard from "./pages/HomePage/Dashboard";
import Modal from "./pages/HomePage/Components/Modal";
import MarkedJobs from "./pages/HomePage/MarkedJobs";

import "./App.css";
import InterestedUsers from "./pages/HomePage/InterestedUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="modal" element={<Modal />} />
          <Route path="interest/:jobId" element={<InterestedUsers />} />
          <Route path="marked" element={<MarkedJobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
