import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price.jsx';
import classes from './Thumbnails.module.css';
export default function Thumbnails({ foods }) {
  return (
    <ul className={classes.list}>
      {foods.map(food => (
        <li key={food.id}>
          <Link to={`/food/${food.id}`}>
          <img
          className={classes.image}
          src={`/food/${food.imageUrl.split('/').pop()}`} 
          alt={food.name}
          />
            <div className={classes.content}>
              <div className={classes.name}>{food.name}</div>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
              <div className={classes.stars}>
              </div>
              <div className={classes.product_item_footer}>
                <div className={classes.cook_time}>
                  <span>🕒</span>
                  {food.cookTime}
                </div>
                <div className={classes.price}>
                <Price price={food.price} />
              </div>
              </div>

            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}