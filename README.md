# Hostel Food Delivery Website

A dedicated food delivery platform tailored exclusively for hostel residents. This web application enables users to browse menus from various food vendors, place orders seamlessly, and get meals delivered directly within their hostel premises. The platform aims to provide a hassle-free, convenient, and user-friendly food ordering experience for students and residents.

---

## Features

- **User Authentication**: Secure signup and login with JWT-based authentication.
- **Browse Menus**: Explore a variety of food items with detailed descriptions, images, and nutritional info.
- **Search by Calories**: Find meals based on calorie count using integrated Spoonacular API.
- **Order Placement**: Easily add items to the cart and place orders with real-time order status updates.
- **Payment Integration**: Seamless payment processing using Razorpay for secure transactions.
- **Order History & Tracking**: Users can view past orders and track ongoing deliveries.
- **Food Request**: Request new food items or menu changes via an email-based request system using Nodemailer.
- **Responsive UI**: Fully responsive design optimized for desktops, tablets, and mobile devices.
- **Chatbot Integration**: AI-powered chatbot to suggest food items based on user preferences and moods.

---

## Tech Stack

- **Frontend**: React.js (with hooks and context API for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Razorpay
- **APIs**: Spoonacular API for nutritional and food data
- **Email Service**: Nodemailer for sending food requests and notifications
- **Styling**: CSS Modules / Tailwind CSS (optional based on implementation)

---

## Installation & Setup Guide

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd FoodMine
```

### 2. Backend Setup
```sh
cd Backend
npm install
```

- Create a `.env` file in the `Backend` directory with the following variables:
  ```env
  MONGODB_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>
  CLIENT_URL=http://localhost:5173
  SPOONACULAR_API_KEY=<your-spoonacular-api-key>
  GEMINI_API_KEY=<your-gemini-api-key>
  RAZORPAY_KEY_ID=<your-razorpay-key-id>
  RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
  ```

- Start the backend server:
```sh
npm start
```

### 3. Frontend Setup
```sh
cd ../Frontend
npm install
```


- Start the frontend development server:
```sh
npm run dev
```

### 4. Build for Production
- To build the frontend and copy the output to the backend's public directory:
```sh
npm run build
npm run postbuild
```

### 5. Access the App
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

For deployment, ensure all environment variables are set on your hosting platform and that both `Backend` and `Frontend` dependencies are installed and built as described above.


