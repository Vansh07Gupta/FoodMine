import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Price from '../../Price/Price';
import classes from './FoodPage.module.css';
import { getById } from '../../../Service/FoodService';
import { useCart } from '../../../hooks/useCart';
import NotFound from '../../NotFound/NotFound';

export default function FoodPage() {
  const [food, setFood] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart');
  };

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);

  return (
    <div className={classes.pageContainer}>
      {!food ? (
        <NotFound message="Food Not Found!" linkText="Back to HomePage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`/food/${food.imageUrl.split('/').pop()}`} 
            alt={food.name}
          />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price} />
            </div>
            <div className={classes.foodInfo}>
              <div className={classes.infoItem}>
                <span className={classes.infoIcon}>🕒</span>
                <span>Delivery in 30-45 minutes</span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoIcon}>🌡️</span>
                <span>Served Hot & Fresh</span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoIcon}>📦</span>
                <span>Eco-friendly Packaging</span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoIcon}>⭐</span>
                <span>Quality Guaranteed</span>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className={classes.foodbutton}
            >
              Add To Cart
            </button>
            <p className={classes.freshNote}>* Prepared fresh to order</p>
          </div>
        </div>
      )}
    </div>
  );
}
