import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './payment.module.css';
import { getNewOrderForCurrentUser } from '../../../Service/orderService';
import Title from '../../Title/Title';
import OrderItemsList from '../../OrderItemsList/OrderItemsList';
import Map from '../../Map/Map';
import PayButtons from '../PayButtons/PayButtons';
import { toast } from 'react-toastify';
import NotFound from '../../NotFound/NotFound';

export default function PaymentPage() {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getNewOrderForCurrentUser();
        if (!data) {
          toast.error('No active order found');
          navigate('/');
          return;
        }
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        toast.error(err.message || 'Error fetching order details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [navigate]);

  if (loading) {
    return <div className={classes.loading}>Loading...</div>;
  }

  if (!order) {
    return <NotFound message="No active order found" linkText="Go to Homepage" />;
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>

        <div className={classes.map}>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <PayButtons order={order} />
          </div>
        </div>
      </div>
    </>
  );
}