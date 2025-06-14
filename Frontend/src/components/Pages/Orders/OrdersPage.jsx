import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import Title from '../../Title/Title.jsx';
import DateTime from '../../DateTime/DateTime.jsx';
import Price from '../../Price/Price.jsx';
import NotFound from '../../NotFound/NotFound.jsx';
import { getAll,getAllStatus } from '../../../Service/orderService.jsx';
import classes from './OrdersPage.module.css'


const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ALL_STATUS_FETCHED':
      return { ...state, allStatus: payload };
    case 'ORDERS_FETCHED':
      return { ...state, orders: payload };
    default:
      return state;
  }
};

export default function OrdersPage() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);

  const { filter } = useParams();

  useEffect(() => {
    getAllStatus().then(status => {
      // console.log("✅ Fetched All Status:", status); // Debugging log
      dispatch({ type: 'ALL_STATUS_FETCHED', payload: status });
    }).catch(error => console.error("🚨 Error fetching status:", error));
  
    getAll(filter).then(orders => {
      // console.log("✅ Fetched Orders:", orders); // Debugging log
      dispatch({ type: 'ORDERS_FETCHED', payload: orders });
    }).catch(error => console.error("🚨 Error fetching orders:", error));
  }, [filter]);
  

  return (
    <div className={classes.container}>
      <Title title="Orders" margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />

      {allStatus && (
        <div className={classes.all_status}>
          <Link to="/orders" className={!filter ? classes.selected : ''}>
            All
          </Link>
          {allStatus.map(state => (
            <Link
              key={state}
              className={state == filter ? classes.selected : ''}
              to={`/orders/${state}`}
            >
              {state}
            </Link>
          ))}
        </div>
      )}

      {orders?.length === 0 && (
        <NotFound
          linkRoute={filter ? '/orders' : '/'}
          linkText={filter ? 'Show All' : 'Go To Home Page'}
        />
      )}

      {orders &&
        orders.map(order => (
          <div key={order.id} className={classes.order_summary}>
            <div className={classes.header}>
              <span>{order.id}</span>
              <span>
                <DateTime date={order.createdAt} />
              </span>
              <span>{order.status}</span>
            </div>
            <div className={classes.items}>
              {order.items.map(item => (
                <Link key={item.food.id} to={`/food/${item.food.id}`}>
                  <img src={`/food/${item.food.imageUrl.split('/').pop()}`}  alt={item.food.name} />
                </Link>
              ))}
            </div>
            <div className={classes.footer}>
              <div>
                <Link to={`/track/${order.id}`}>Show Order</Link>
              </div>
              <div>
                <span className={classes.price}>
                  <Price price={order.totalPrice} />
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}