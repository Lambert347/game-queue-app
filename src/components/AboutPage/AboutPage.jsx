import React from 'react';
import Box from '@material-ui/core/Box';
import useStyles from '../App/style.js'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

  //import the styling from the style.js file
  const classes = useStyles();

  //renders the pretty basic about page to the DOM
  return (
    <div className="container">
      <Box className={classes.about}>
        <p>Technologies used to create this project:</p>
        <ul>
          <li>Javascript</li>
          <li>Node.js</li>
          <li>React</li>
          <li>React-Redux</li>
          <li>Material-ui</li>
          <li>React-beautiful-dnd</li>
          <li>reactjs-popup</li>
          <li>Postgresql</li>
          <li>Express</li>
        </ul>
        <br></br>
        <h2>Credits to Pierre Roussel for his fantastic artwork</h2>
      </Box>
    </div>
  );
}

export default AboutPage;
