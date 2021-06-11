import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Button, Typography} from '@material-ui/core';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const goProfile = () => {
    console.log('click');
    history.push('/profile');
  }
  return (
    <>
    <div className="container" onSubmit={goProfile}>
      <Typography variant="h3" align="center" gutterBottom color="secondary" fontWeight="bold">
        Welcome, {user.username}!
      </Typography>
      <Typography variant="h3" align="center" gutterBottom color="secondary" fontWeight="bold">
        We have a new profile set up for you, click the button to go to your profile.
      </Typography>
      <LogOutButton className="btn" />
      <Button color="secondary" variant="contained" onClick={goProfile}>Go to profile</Button>
    </div>
    
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
