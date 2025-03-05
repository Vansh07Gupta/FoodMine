import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import Price from '../../Price/Price';
import classes from './FoodPage.module.css';
import { getById } from '../../../Service/FoodService';
export default function FoodPage() {
  const [food, setFood] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
return <>
{food && <div className={classes.container}>
        <img
            className={classes.image}
            src={`${food.imageUrl}`}
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
            <button>Add To Cart</button>
            </div>
        </div>

    }
</>
}