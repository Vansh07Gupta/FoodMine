import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.jsx';
import Title from '../../Title/Title.jsx';
import Input from '../../Input/input.jsx';
import classes from './LoginPage.module.css';
import { EMAIL } from '../../patterns/constant.jsx';
import Button from '../../Button/Button.jsx';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, navigate, returnUrl]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}></div>
  
      <div className={classes.right}>
        <div className={classes.details}>
          <Title title="Login" />
          <form onSubmit={handleSubmit(submit)} noValidate>
            <Input
              type="email"
              label="Email"
              {...register('email', {
                required: true,
                pattern: EMAIL,
              })}
              error={errors.email}
            />
  
            <Input
              type="password"
              label="Password"
              {...register('password', {
                required: true,
              })}
              error={errors.password}
            />
  
            <Button type="submit" text="Login" />
            <div className={classes.register}>
              New user? &nbsp;
              <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;
