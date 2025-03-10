import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import { toast } from "react-toastify";
import { pay } from "../../../Service/orderService";
import classes from "./payButton.module.css"

const PayButtons = ({ order }) => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!order || !order.totalPrice) {
      toast.error("Order details are missing!");
      return;
    }

    const options = {
      key: "rzp_test_g0Ycj9hUjbjJjR",
      amount: order.totalPrice * 100, 
      currency: "INR",
      name: "Your Company",
      description: "Order Payment",
      image: "/vite.svg",
      handler: async function (response) {
        try {
          const orderId = await pay(response.razorpay_payment_id);
          clearCart();
          toast.success("Payment Successful");
          navigate(order?._id ? `/track/${order._id}` : "/orders");
        
        } catch (error) {
          toast.error("Payment Save Failed");
        }
      },
      prefill: {
        name: order.name, 
        email: order.email, 
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return <button className={classes.payButton} onClick={handlePayment}>Pay with Razorpay</button>;
};

export default PayButtons;
