import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <h2>
            Hello fellow sweaty gamer!
          </h2>

          <p>
            This app allows users to save games to a queue to organize their game time and keep track of what games they want to finish. The user has access to games added by the user base and can elect
            to add games of their own for themselves or others to use.
          </p>

          <p>
            Are you a returning member? Get logged in and get back into the action!
            Are you a new member? Click on registration to get started!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <LoginForm />

          <center>
            <h4>New Member?</h4>
            <button className="btn btn_sizeSm" onClick={onRegister}>
              Register
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
