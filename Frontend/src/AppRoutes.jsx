import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Pages/Home/Homepage.jsx";
import FoodPage from "./components/Pages/Food/FoodPage.jsx";
import CartPage from "./components/Pages/Cart/CartPage.jsx";
import LoginPage from "./components/Pages/Login/LoginPage.jsx";
import Register from "./components/Pages/Register/Register.jsx";
import AuthRoute from "./components/AuthRoute/AuthRoute.jsx";
import CheckoutPage from "./components/Pages/Checkout/CheckoutPage.jsx";
import PaymentPage from "./components/Pages/Payment/PaymentPage.jsx";
import OrderTrackPage from "./components/Pages/OrderTrack/OrderTrackPage.jsx";
import ProfilePage from "./components/Pages/Profile/ProfilePage.jsx";
import OrdersPage from "./components/Pages/Orders/OrdersPage.jsx";
import Dashboard from "./components/Pages/Dashboard/Dashboard.jsx";
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx";
import FoodsAdminPage from "./components/Pages/FoodsAdmin/FoodsAdminPage.jsx";

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
      <Route path="/track/:orderId" 
      element={
      <AuthRoute>
        <OrderTrackPage/>
      </AuthRoute>
      } />

      <Route path="/profile" 
      element={
      <AuthRoute>
        <ProfilePage/>
      </AuthRoute>
      } />
      <Route path="/orders/:filter?" 
      element={
      <AuthRoute>
        <OrdersPage/>
      </AuthRoute>
      } />
      <Route path="/dashboard" 
      element={
      <AuthRoute>
        <Dashboard/>
      </AuthRoute>
      } />
      <Route path="/admin/foods/:searchTerm?" 
      element={
      <AdminRoute>
        <FoodsAdminPage/>
      </AdminRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;
