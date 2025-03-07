import express from 'express';  // ✅ Use ES Modules only
import cors from 'cors';
import foodRouter from './Routers/food.router.js';
import userRouter from './Routers/user.router.js';

const app = express();  // ✅ No duplicate declaration

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.use('/api/food', foodRouter);
app.use('/api/users', userRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
