import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Pages/Home/Homepage";
import FoodPage from "./components/Pages/Food/FoodPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search/:searchTerm" element={<Homepage />} />
      <Route path="/food/:id" element={<FoodPage />} />
    </Routes>
  );
};

export default AppRoutes;
