import { Router } from 'express';
import handler from 'express-async-handler';
import authMid from '../middlewares/auth.mid.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';

const router = Router();
router.use(authMid); 

router.post(
  '/create',
  handler(async (req, res) => {
    console.log('📌 Order creation endpoint hit'); 
    console.log('🔍 User:', req.user);

    if (!req.user || !req.user.id) {
      console.log('🚨 Error: User not found in request');
      return res.status(401).send('Unauthorized: User not authenticated');
    }

    const order = req.body;

    if (!order.items || order.items.length === 0) {
      console.log('🚨 Error: Cart is empty');
      return res.status(400).send('Cart Is Empty!');
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

export default router;
