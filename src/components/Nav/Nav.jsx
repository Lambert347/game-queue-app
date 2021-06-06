import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';
import {useSelector} from 'react-redux';
import Drawer from '../Drawer/Drawer';
import {AppBar, CssBaseline, Toolbar } from '@material-ui/core'
import useStyles from '../App/style.js'

function Nav() {
  const user = useSelector((store) => store.user);
  
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const classes = useStyles();
  return (
    <>
    <CssBaseline />
    <div className="nav">
      
          <Drawer className={classes.drawer} />

      
    </div>
    </>
  );
}

export default Nav;
