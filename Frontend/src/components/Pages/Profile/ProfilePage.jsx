import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import classes from './profilePage.module.css';
import Title from '../../Title/Title';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import ChangePassword from '../../ChangePassword/ChangePassword';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, updateProfile } = useAuth();

  const submit = async (data) => {
    try {
      setIsUpdating(true);
      await updateProfile(data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />
        <div className={classes.profileInfo}>
          <div className={classes.infoItem}>
            <span className={classes.label}>Email:</span>
            <span className={classes.value}>{user.email}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(submit)}>
          <Input
            defaultValue={user.name}
            type="text"
            label="Name"
            {...register('name', {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />
          <Input
            defaultValue={user.address}
            type="text"
            label="Address"
            {...register('address', {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          <Button 
            type="submit" 
            text={isUpdating ? "Updating..." : "Update Profile"} 
            backgroundColor="#009e84"
            disabled={isUpdating}
          />
        </form>

        <div className={classes.divider}>
          <span>or</span>
        </div>

        <ChangePassword />
      </div>
    </div>
  );
}