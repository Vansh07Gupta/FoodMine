import React, { useState, useEffect } from 'react';
import classes from './payment.module.css';
import { getNewOrderForCurrentUser } from '../../../Service/orderService';
import Title from '../../Title/Title';
import OrderItemsList from '../../OrderItemsList/OrderItemsList';
import Map from '../../Map/Map';
import PayButtons from '../PayButtons/PayButtons';

export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);

  if (!order) return;

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