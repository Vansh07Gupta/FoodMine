import dotenv from 'dotenv';  
dotenv.config();
import express from 'express'; 
import cors from 'cors';
import foodRouter from './Routers/food.router.js';
import userRouter from './Routers/user.router.js';
import orderRouter from './Routers/order.router.js'

const app = express(); 
app.use(express.static('public'));

import { dbconnect } from './config/database.config.js';
dbconnect();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use('/api/food', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders',orderRouter)

const PORT = 5000;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
