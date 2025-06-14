import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { trackOrderById } from '../../../Service/orderService.jsx';
import NotFound from '../../NotFound/NotFound.jsx';
import { useEffect } from 'react';
import DateTime from '../../DateTime/DateTime.jsx';
import OrderItemsList from '../../OrderItemsList/OrderItemsList.jsx';
import Title from '../../Title/Title.jsx';
import Map from '../../Map/Map.jsx';
import classes from "./orderTrackPage.module.css"

const OrderTrackPage = () => {
    const {orderId} = useParams();
    const[order,setOrder] = useState();

    useEffect(() => {
        orderId &&
          trackOrderById(orderId).then(order => {
            setOrder(order);
          });
      }, [orderId]);

      if (!orderId)
        return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

      return (
        order && (
          <div className={classes.container}>
            <div className={classes.content}>
              <h1>Order #{order.id}</h1>
              <div className={classes.header}>
                <div>
                  <strong>Date</strong>
                  <DateTime date={order.createdAt} />
                </div>
                <div>
                  <strong>Name</strong>
                  {order.name}
                </div>
                <div>
                  <strong>Address</strong>
                  {order.address}
                </div>
                <div>
                  <strong>State</strong>
                  {order.status}
                </div>
                {order.paymentId && (
                  <div>
                    <strong>Payment ID</strong>
                    {order.paymentId}
                  </div>
                )}
              </div>
    
              <OrderItemsList order={order} />
            </div>
    
            <div>
              <Title title="Your Location" fontSize="1.6rem" />
              <Map location={order.addressLatLng} readonly={true} />
            </div>
    
            <div className={classes.actions}>
              {order.status === 'NEW' && (
                <Link to="/payment" className={classes.paymentLink}>
                  Go To Payment
                </Link>
              )}
              {order.status === 'PAYED' && (
                <Link to="/" className={classes.homeLink}>
                  Return to Homepage
                </Link>
              )}
            </div>
          </div>
        )
      );
}

export default OrderTrackPage