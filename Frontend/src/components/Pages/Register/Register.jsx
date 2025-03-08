import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../Input/Input';  // FIXED import
import Title from '../../Title/Title';
import classes from './Register.module.css';
import Button from '../../Button/Button';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { EMAIL } from '../../patterns/constant';

export default function Register() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, navigate, returnUrl]); 

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await auth.register(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register('name', { required: true, minLength: 5 })}
            error={errors.name}
          />

          <Input
            type="email"
            label="Email"
            {...register('email', { required: true, pattern: EMAIL })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', { required: true, minLength: 5 })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match', // FIXED validation
            })}
            error={errors.confirmPassword}
          />

          <Input
            type="text"
            label="Address"
            {...register('address', { required: true, minLength: 10 })}
            error={errors.address}
          />

          <Button type="submit" text="Register" />

          <div className={classes.login}>
            Already a user? &nbsp;
            <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
