import {Router} from 'express';
import { FoodModel } from '../models/food.model.js';
import handler from 'express-async-handler';
import admin from '../middlewares/admin.mid.js';
const foodRouter = Router();

foodRouter.get('/', handler(async (req, res) => {
  const foods = await FoodModel.find({})
  res.send(foods);
}));
  
foodRouter.get(
  '/search/:searchTerm',
  handler(async (req, res) => {   
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
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


foodRouter.get('/:foodId',
  handler(async (req, res) => {
    console.log(req.params); 
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  }));
  
export default foodRouter;