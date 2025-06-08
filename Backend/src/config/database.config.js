import { set, connect } from 'mongoose';
set('strictQuery', true);
import { UserModel } from '../models/user.model.js';
import { FoodModel } from '../models/food.model.js';
import sample_foods from '../Data.js';
import { sample_users } from '../Data.js';
import bcrypt from 'bcryptjs'
const PASSWORD_HASH_SALT_ROUNDS = 10;

export const dbconnect = async () => {
  try {
    await connect(process.env.MONGO_URI);
    await seedUsers();
    await seedFoods();
    console.log('Connected successfully---');
  } catch (error) {
    console.error(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }
  console.log('Users seed is done!');
}

async function seedFoods() {
  const foodsCount = await FoodModel.countDocuments();
  if (foodsCount > 0) {
    console.log('Foods seed is already done!');
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }
  console.log('Foods seed Is Done!');
}