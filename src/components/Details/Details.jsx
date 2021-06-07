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

function Details(){
    const details = useSelector(store => store.details);
    const dispatch = useDispatch();
    const queue = useSelector(store => store.queue);

    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'});
    }, [])
            
            


    console.log('Checking queue:', queue);


    const saveGame = (event) => {
        dispatch({type: 'UPDATE_QUEUE', payload: details})
        
    }

    const {id} = useParams();

    useEffect (() => {
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }, [])

    const classes = useStyles();
    return (
        <div>
            {details === undefined ?
            '' : (
                <Box className={classes.details}>
                    <img src={details.image_url} style={{position: 'absolute', right: 50, width: '450px', marginLeft: '150px', border:'1px #DCDCDC', borderRadius: '10px'}}></img>
                    <Box className={classes.detailsText}>
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
                        {details.has_game === true ?
                        <Button style={{width: 140}} fullWidth="false" variant="contained" disabled>Already in Queue</Button> 
                        : (
                        <Button style={{width: 140}} fullWidth="false" variant="contained" color="secondary" onClick={(event) => saveGame(event)}>Add Game</Button>
                            
                    )}
                    </Box>
                    
                </Box>
            )}
        </div>
    )

}

export default Details;