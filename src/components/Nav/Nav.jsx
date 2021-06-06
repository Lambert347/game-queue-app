import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';
import {useSelector} from 'react-redux';
import Drawer from '../Drawer/Drawer';

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

  return (
    <div className="nav">
      <Drawer>
      <Link className="navLink" to="/add">
          Add
      </Link>

      </Drawer>
      <Link to="/home">
        <h2 className="nav-title">Game_time</h2>
      </Link>
    </div>
  );
}

export default Nav;
