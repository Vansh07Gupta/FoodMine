import { Router } from 'express';
import handler from 'express-async-handler';
import authMid from '../middlewares/auth.mid.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';

const router = Router();
router.use(authMid);  // Ensure all routes require authentication

/** 
 * 📌 CREATE NEW ORDER 
 */
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

    // Delete any existing NEW order before creating a new one
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();

    console.log('✅ Order created successfully:', newOrder);
    res.send(newOrder);
  })
);

/** 
 * 📌 FETCH NEW ORDER FOR CURRENT USER
 */
router.get(
  '/newOrderForCurrentUser',
  handler(async (req, res) => {
    console.log("🔍 Fetching new order for user:", req.user?.id);  

    const order = await getNewOrderForCurrentUser(req);

    if (!order) {
      console.log("🚨 No new order found for user:", req.user?.id);
      return res.status(400).send({ message: "No new order found" });
    }

    console.log("✅ Order found:", order);
    res.send(order);
  })
);

/** 
 * 📌 PROCESS PAYMENT 
 */
router.put(
  '/pay',
  handler(async (req, res) => {
    const { paymentId } = req.body;
    console.log("🔍 Processing payment for order... Payment ID:", paymentId);

    const order = await getNewOrderForCurrentUser(req);

    if (!order) {
      console.log("🚨 Order not found!");
      return res.status(400).send('Order Not Found!');
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    console.log("✅ Payment successful! Order ID:", order._id);
    
    sendEmailReceipt(order);

    res.send(order._id);
  })
);

/**
 * 📌 HELPER FUNCTION: Get new order for current user
 */
const getNewOrderForCurrentUser = async (req) => {
  console.log("🔍 Looking for order with status NEW for user:", req.user.id);

  const order = await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  }).populate('user');

  if (!order) {
    console.log("🚨 No order found for user:", req.user.id);
  }

  return order;
};

export default router;
