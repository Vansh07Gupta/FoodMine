import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Pages/Home/Homepage";
import FoodPage from "./components/Pages/Food/FoodPage";
import CartPage from "./components/Pages/Cart/CartPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search/:searchTerm" element={<Homepage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;
