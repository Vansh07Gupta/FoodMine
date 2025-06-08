import { Router } from 'express';
import handler from 'express-async-handler';
import authMid from '../middlewares/auth.mid.js';
import nodemailer from 'nodemailer';

const router = Router();

router.use(authMid);

router.post(
  '/email/food_service/request',
  handler(async (req, res) => {
    if (!req.user || !req.user.email) {
      return res.status(401).send('Unauthorized');
    }

    const { id, name, image, price } = req.body;

    if (!id || !name) {
      return res.status(400).send('Food item info missing');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,       
        pass: process.env.USER_PASSWORD,  
      },
    });

    // Email content options
    const mailOptions = {
      from: process.env.USER_EMAIL, 
      to: process.env.ADMIN_EMAIL, 
      subject: `Food Request from User ${req.user.email}`,
      html: `
        <h3>New Food Item Request</h3>
        <p><strong>User:</strong> ${req.user.email}</p>
        <p><strong>Food ID:</strong> ${id}</p>
        <p><strong>Food Name:</strong> ${name}</p>
        <p><strong>Price:</strong> ${price || 'N/A'}</p>
        ${
          image
            ? `<p><img src="${image}" alt="${name}" width="200" style="border:1px solid #ccc;"/></p>`
            : ''
        }
      `,
    };

    await transporter.sendMail(mailOptions);

    res.send({ message: 'Request email sent to admin' });
  })
);

export default router;
