import { Router } from "express";
import { sample_users } from "../Data.js";
import jwt from "jsonwebtoken";

import{ BAD_REQUEST } from "../constants/httpsConstants.js";
const userRouter = Router();
userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
    const user = sample_users.find(
        user => user.email === email && user.password === password
    );
    if(user){
        res.send(generateTokenResponse(user));
        return;
    }
    res.status(BAD_REQUEST).send("Invalid email or password");
  });

  const generateTokenResponse = user => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'SomeRandomKey',
      {
        expiresIn: '30d',
      }
    );
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token,
    };
  };
  export default userRouter;