import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button} from '@material-ui/core';
import axios from 'axios';
import useStyles from '../App/style.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// function to render a details page for a specific game
function Details(){

    //constant whose value is set to details from the store that correspond to the id of game that will be rendered to this page
    const details = useSelector(store => store.details);
    const dispatch = useDispatch();

    //function to refresh the page, this function is necessary to make sure that the conditional rendering on the add button works 
    const refreshPage = () => {
        window.location.reload(false);
    }

    // when the add button is clicked, makes a dispatch to the saga to add this game to the user's queue, with the payload being the entire game
    const saveGame = (event) => {
        dispatch({type: 'UPDATE_QUEUE', payload: details})
        
    }

    //id constant using useParams to set that constant to the id of the game shown on this details page
    //used to get those specific details for only this game
    const {id} = useParams();

    //using the above id, makes a dispatch to fetch the details for only this game
    useEffect (() => {
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }, [])

    const classes = useStyles();
    return (
        <div>

            {/* conditional rendering to make sure that the page does not load before all the data from the server is ready */}
            {details === undefined ?
            '' : (
                <Box className={classes.details}>
                    <img src={details.image_url} style={{position: 'absolute', right: 50, width: '450px', marginLeft: '150px', border:'1px #DCDCDC', borderRadius: '10px'}}></img>
                    <Box className={classes.detailsText}>
                        
                        {/* renders the data to the dom */}
                        <Typography variant="h4" align="left" gutterBottom color="secondary" fontWeight="bold">
                            {details.game_title}
                        </Typography>
                        <Typography variant="h4" align="left" gutterBottom color="secondary" fontWeight="bold">
                            Developer: {details.developer}
                        </Typography>
                        <Typography variant="h4" align="left" gutterBottom color="secondary" fontWeight="bold">
                            Publisher: {details.publisher}
                        </Typography>
                        <Typography variant="h4" align="left" gutterBottom color="secondary" fontWeight="bold">
                            Genre: {details.genre_name}
                        </Typography>
                        <Typography variant="h4" align="left" gutterBottom color="secondary" fontWeight="bold">
                            {details.description}
                        </Typography>
                        <Typography variant="h4" align="left" gutterBottom color="secondary" fontWeight="bold">
                            Average Playtime: {details.play_time} hours
                        </Typography>

                        {/* this column from the database checks to see if the user already has the game in their queue. If they do, then a disabled button renders 
                        and lets the user know that the game is already in their queue */}
                        {details.has_game === true ?
                        <Button style={{width: 140}} fullWidth="false" variant="contained" disabled>Already in Queue</Button> 
                        : (

                        //if not, then a button that allows the user to add the game to their queue renders 
                        //when clicked, this button both runs the saveGame function above, and refreshes the page
                        //this refresh re-renders the now disabled button to indicate that the game was added successfully 
                        <Button style={{width: 140}} fullWidth="false" variant="contained" color="secondary" onClick={function(event){saveGame(event); refreshPage();}}>Add Game</Button>
                    )}
                    </Box>
                    
                </Box>
            )}
        </div>
    )

}

export default Details;