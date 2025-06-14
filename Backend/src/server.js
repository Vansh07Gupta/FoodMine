import dotenv from 'dotenv';  
dotenv.config();
import express from 'express'; 
import cors from 'cors';
import foodRouter from './Routers/food.router.js';
import userRouter from './Routers/user.router.js';
import orderRouter from './Routers/order.router.js'
import foodBotRoutes from './Routers/foodBot.js';
import foodCalorieRouter from './Routers/foodCalorieRouter.js';
import  RequestbyEmail  from './Routers/RequestbyEmail.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express(); 
app.use(express.static('public'));

import { dbconnect } from './config/database.config.js';
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

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
app.use('/api', foodBotRoutes);
app.use('/api', foodCalorieRouter);

app.use('/api', RequestbyEmail);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicFolder, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
