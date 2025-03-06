import React from 'react';
import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
<div className={classes.container}>
Nothing Found!
  <Link to='/'>Go To Home Page</Link>
</div>

  );
}
