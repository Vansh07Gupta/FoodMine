import { Router } from 'express';
import handler from 'express-async-handler';
import authMid from '../middlewares/auth.mid.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import { UserModel } from '../models/user.model.js';

const router = Router();
router.use(authMid);  
router.post(
  '/create',
  handler(async (req, res) => {

    if (!req.user || !req.user.id) {
      return res.status(401).send('Unauthorized: User not authenticated');
    }

    const order = req.body;

    if (!order.items || order.items.length === 0) {
      return res.status(400).send('Cart Is Empty!');
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();

    // console.log('✅ Order created successfully:', newOrder);
    res.send(newOrder);
  })
);


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


router.put(
  '/pay',
  handler(async (req, res) => {
    const { paymentId } = req.body;

    const order = await getNewOrderForCurrentUser(req);

    if (!order) {
      console.log("🚨 Order not found!");
      return res.status(400).send('Order Not Found!');
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    // console.log("✅ Payment successful! Order ID:", order._id);
    
  

    res.send(order._id);
  })
);

router.get(
  '/track/:orderId',
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      _id: orderId,
    };

    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);

    if (!order) return res.send(UNAUTHORIZED);

    return res.send(order);
  })
);

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
