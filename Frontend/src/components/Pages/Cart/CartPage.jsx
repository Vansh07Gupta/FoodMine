import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../../Price/Price';
import Title from '../../Title/Title';
import { useCart } from '../../../hooks/useCart';
import classes from './cartPage.module.css';
import NotFound from '../../NotFound/NotFound';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <div className={classes.pageContainer}>
      <Title title="" margin="1.5rem 0 0 2.5rem" />
      
      {cart.items.length === 0 ? (
        <div className={classes.emptyCart}>
          <NotFound message="Your cart is empty" />
          <Link to="/" className={classes.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.cartItems}>
            <div className={classes.cartHeader}>
              <h2>Items in your cart</h2>
              <span className={classes.itemCount}>{cart.items.length} items</span>
            </div>
            
            <ul className={classes.list}>
              {cart.items.map((item) => (
                <li key={item.food.id} className={classes.cartItem}>
                  <div className={classes.itemImage}> 
                    <img 
                      src={`/food/${item.food.imageUrl.split('/').pop()}`} 
                      alt={item.food.name}
                    />
                  </div>
                  
                  <div className={classes.itemDetails}>
                    <Link to={`/food/${item.food.id}`} className={classes.itemName}>
                      {item.food.name}
                    </Link>
                    <div className={classes.itemPrice}>
                      <Price price={item.food.price} />
                    </div>
                  </div>

                  <div className={classes.quantityControl}>
                    <label htmlFor={`quantity-${item.food.id}`}>Quantity:</label>
                    <select
                      id={`quantity-${item.food.id}`}
                      value={item.quantity}
                      onChange={(e) => changeQuantity(item, Number(e.target.value))}
                      className={classes.quantitySelect}
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={classes.itemTotal}>
                    <span>Total:</span>
                    <Price price={item.price} />
                  </div>

                  <button
                    className={classes.removeButton}
                    onClick={() => removeFromCart(item.food.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={classes.cartSummary}>
            <div className={classes.summaryHeader}>
              <h2>Order Summary</h2>
            </div>
            
            <div className={classes.summaryContent}>
              <div className={classes.summaryRow}>
                <span>Items ({cart.totalCount}):</span>
                <Price price={cart.totalPrice} />
              </div>
              
              <div className={classes.summaryRow}>
                <span>Delivery Fee:</span>
                <span>Free</span>
              </div>
              
              <div className={classes.summaryTotal}>
                <span>Total Amount:</span>
                <Price price={cart.totalPrice} />
              </div>
            </div>

            <div className={classes.checkout}>
              <Link to="/checkout" className={classes.checkoutButton}>
                Proceed To Checkout
              </Link>
              <Link to="/" className={classes.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
