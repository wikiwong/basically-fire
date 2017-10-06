import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './index.css';

const SideNav = () => (
  <ul className={classes.sideNav}>
    <li><Link to="/scene1">Scene1</Link></li>
  </ul>
);

export default SideNav;
