import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './Footer.module.css';

const Footer = () => {
  const location = useLocation();
  const isFoodPage = location.pathname.startsWith('/food/');

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.footerSection}>
          <h3>FoodMine</h3>
          <p>Delicious food delivered to your doorstep. Experience the best of Indian and Chinese cuisine.</p>
        </div>

        <div className={classes.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        <div className={classes.footerSection}>
          <h3>Contact Us</h3>
          <ul>
            <li>📍 123 Food Street, Cuisine City</li>
            <li>📞 +1 234 567 8900</li>
            <li>✉️ support@foodmine.com</li>
          </ul>
        </div>

        <div className={classes.footerSection}>
          <h3>Follow Us</h3>
          <div className={classes.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>

        {isFoodPage && (
          <div className={classes.footerSection}>
            <h3>Food Information</h3>
            <ul>
              <li>🕒 Delivery Time: 30-45 minutes</li>
              <li>🌡️ Food Temperature: Hot & Fresh</li>
              <li>📦 Packaging: Eco-friendly</li>
              <li>⭐ Quality Guarantee</li>
            </ul>
          </div>
        )}
      </div>
      <div className={classes.footerBottom}>
        <p>&copy; 2025 FoodMine. All rights reserved.</p>
        {isFoodPage && (
          <p className={classes.foodPageNote}>* All food items are prepared fresh to order</p>
        )}
      </div>
    </footer>
  );
};

export default Footer; 