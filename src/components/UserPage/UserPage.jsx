import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

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
      <h2>Welcome, {user.username}!</h2>
      <p>We have a new profile set up for you, click the button to go to your profile.</p>
      <LogOutButton className="btn" />
      <button onClick={goProfile}>Go to profile</button>
    </div>
    
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
