import { useParams } from 'react-router-dom';
import classes from './FoodEdit.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById,update } from '../../../Service/FoodService';
import Title from '../../Title/Title';
import InputContainer from '../../InputContainer/InputContainer.jsx';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { uploadImage } from '../../../Service/uploadService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function FoodEditPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!foodId;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(foodId).then(food => {
      if (!food) return;
      reset(food);
      setImageUrl(food.imageUrl);
    });
  }, [foodId]);

const submit = async foodData => {
  if (!imageUrl) {
    toast.error("Please upload an image first!");
    return;
  }
  const food = { ...foodData, imageUrl };

  try {
    if (isEditMode) {
      await update(food);
      toast.success(`Food "${food.name}" updated successfully!`);
    } else {
      const newFood = await add(food);
      toast.success(`Food "${food.name}" added successfully!`);
      navigate('/admin/editFood/' + newFood._id, { replace: true });
    }
  } catch (error) {
    toast.error("Something went wrong!");
    console.error(error);
  }
};
  const upload = async event => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit Food' : 'Add Food'} />
        <form   
          className={classes.form}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <InputContainer label="Select Image">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>
{imageUrl && (
  <a href={`/${imageUrl}`} className={classes.image_link} target="_blank" rel="noopener noreferrer">
    <img src={`/${imageUrl}`} alt="Uploaded" />
  </a>
)}

          <Input
            type="text"
            label="Name"
            {...register('name', { required: true, minLength: 5 })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Price"
            {...register('price', { required: true })}
            error={errors.price}
          />


          <Input
            type="text"
            label="Cook Time"
            {...register('cookTime', { required: true })}
            error={errors.cookTime}
          />

          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
}
