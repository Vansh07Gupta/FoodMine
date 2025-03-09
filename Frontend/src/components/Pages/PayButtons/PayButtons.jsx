import React, { useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useLoading } from '../../../hooks/useLoading';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { toast } from 'react-toastify';
import { pay } from '../../../Service/orderService';

const PayButtons = ({ order }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: 'AUbCsUIPGnRanWCE00QvJFadSfq3Q9rpXBIEwlMpJjEbU2SwklA4BaJ0qE3AismKs9LoIT7o4S67c17G',
        currency: 'USD',
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
};

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (isPending) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isPending]); 

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      toast.success('Payment Saved Successfully');
      navigate('/track/' + orderId);
    } catch (error) {
      toast.error('Payment Save Failed'); 
    }
  };

  const onError = (err) => {
    toast.error('Payment Failed'); 
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}

export default PayButtons;
