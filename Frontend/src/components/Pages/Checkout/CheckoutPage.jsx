import React from 'react';
import { useCart } from '../../../hooks/useCart.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createOrder } from '../../../Service/orderService.jsx';
import classes from './checkoutPage.module.css';
import Title from '../../Title/Title.jsx';
import Button from '../../Button/Button.jsx';
import OrderItemsList from '../../OrderItemsList/OrderItemsList.jsx';
import Map from '../../Map/Map.jsx';
import Input from '../../Input/Input.jsx';
export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async data => {
    if (!order.addressLatLng) {
      toast.warning('Please select your location on the map');
      return;
    }

    await createOrder({ ...order, name: data.name, address: data.address }, user.token);
    navigate('/payment');
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register('name')}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register('address')}
              error={errors.address}
            />
          </div>
          <OrderItemsList order={order} />
        </div>
        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={latlng => {
              setOrder({ ...order, addressLatLng: latlng });
            }}
          />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Go To Payment"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>
    </>
  );
}