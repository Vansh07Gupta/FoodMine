import { Router } from "express";
import jwt from "jsonwebtoken";
import{ BAD_REQUEST } from "../constants/httpsConstants.js";
const userRouter = Router();
const PASSWORD_HASH_SALT_ROUNDS = 10;
import authMid from "../middlewares/auth.mid.js";
import handler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/user.model.js";

userRouter.post("/login", handler( async (req, res) => {
  const { email, password } = req.body;
    const user = await UserModel.findOne({email});
    if(user && await bcrypt.compare(password,user.password)){
        res.send(generateTokenResponse(user));
        return;
    }
    res.status(BAD_REQUEST).send("Invalid email or password");
  }));


  userRouter.put(
    '/updateProfile',
    authMid,
    handler(async (req, res) => {
      const { name, address } = req.body;
      const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { name, address },
        { new: true }
      );
  
      res.send(generateTokenResponse(user));
    })
  );

userRouter.post(
  '/register',
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(BAD_REQUEST).send('User already exists, please login!');
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      PASSWORD_HASH_SALT_ROUNDS
    );

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address,
    };

    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
  })
);

userRouter.put(
  '/changePassword',
  authMid,
  handler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(BAD_REQUEST).send('Change Password Failed!');
      return;
    }

    const equal = await bcrypt.compare(currentPassword, user.password);

    if (!equal) {
      res.status(BAD_REQUEST).send('Current Password Is Not Correct!');
      return;
    }

    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    await user.save();

    res.send();
  })
);

  const generateTokenResponse = user => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
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