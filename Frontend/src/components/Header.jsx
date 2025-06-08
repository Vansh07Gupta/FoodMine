import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to="/" className={classes.logo}>
                    Food<span className={classes.logoHighlight}> Mine!</span>
                </Link>
                <nav>
                    <ul className={classes.navList}>
                        {user ? (
                            <li className={classes.menuContainer}>
                                <span className={classes.userName}>{user.name}</span>
                                <div className={classes.dropdownMenu}>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/orders">Orders</Link>
                                    <span onClick={logout}>Logout</span>
                                </div>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" className={classes.link}>Login</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/cart" className={classes.cart}>
                                Cart {cart.totalCount > 0 && (
                                    <span className={classes.cartCount}>{cart.totalCount}</span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
