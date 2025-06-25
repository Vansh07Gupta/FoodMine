import { Router } from 'express';
import { FoodModel } from '../models/food.model.js';
import handler from 'express-async-handler';
import admin from '../middlewares/admin.mid.js';

const foodRouter = Router();

foodRouter.get(
  '/',
  handler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
  })
);

foodRouter.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

foodRouter.get(
  '/:foodId',
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);

foodRouter.delete(
  '/:foodId',
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await FoodModel.deleteOne({ _id: foodId });
    res.send();
  })
);

foodRouter.put(
  '/:foodId',
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    const updatedFood = await FoodModel.findByIdAndUpdate(foodId, req.body, {
      new: true,
    });

    if (!updatedFood) {
      return res.status(404).send('Food not found');
    }

    res.send(updatedFood);
  })
);

foodRouter.post(
  '/',
  admin,
  handler(async (req, res) => {
    const newFood = new FoodModel(req.body);
    const savedFood = await newFood.save();
    res.status(201).send(savedFood);
  })
);


export default foodRouter;
