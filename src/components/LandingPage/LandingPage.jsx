import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import useStyles from '../App/style';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };

  const classes = useStyles();

  return (
  <>
  <Container maxWidth="sm" className={classes.lndHead}>
    <Typography variant="h2" align="center" gutterBottom color="black">
        Game_time
    </Typography>
  </Container>
  <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} xs={false} sm={4} md={7} className={classes.landingImage} />
    <Grid item item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <h2>{heading}</h2>

        {/* <div className="grid">
          <div className="grid-col grid-col_4"> */}
            <LoginForm />
            <center>
              <h4>New Member?</h4>
              <button className="btn btn_sizeSm" onClick={onRegister}>
                Register
              </button>
            </center>
          {/* </div>
        </div> */}
      </div>




    </Grid>
    
  </Grid>
  </>
  );
}

export default LandingPage;
