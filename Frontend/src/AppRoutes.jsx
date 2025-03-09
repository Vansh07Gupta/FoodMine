import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Pages/Home/Homepage";
import FoodPage from "./components/Pages/Food/FoodPage";
import CartPage from "./components/Pages/Cart/CartPage";
import LoginPage from "./components/Pages/Login/LoginPage";
import Register from "./components/Pages/Register/Register";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import CheckoutPage from "./components/Pages/Checkout/CheckoutPage";
import PaymentPage from "./components/Pages/Payment/PaymentPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search/:searchTerm" element={<Homepage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" 
      element={
      <AuthRoute>
        <CheckoutPage/>
      </AuthRoute>
      } />
      <Route path="/payment" 
      element={
      <AuthRoute>
        <PaymentPage/>
      </AuthRoute>
      } />

    </Routes>
  );
};

export default AppRoutes;
