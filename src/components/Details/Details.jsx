import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button} from '@material-ui/core';
import axios from 'axios';

function Details(){
    const details = useSelector(store => store.details);
    const dispatch = useDispatch();
    const queue = useSelector(store => store.queue);

    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'});
    }, [])
            
            


    console.log('Checking queue:', queue);


    const saveGame = () => {
        dispatch({type: 'UPDATE_QUEUE', payload: details})
        
    }

    const {id} = useParams();

    useEffect (() => {
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }, [])

    
    return (
        <div>
            {details === undefined ?
            '' : (
                <section>
                        <p>{details.game_title}</p>
                        <img src={details.image_url}></img>
                        <p>{details.developer}</p>
                        <p>{details.publisher}</p>
                        <p>{details.genre_name}</p>
                        <p>{details.description}</p>
                        <p>{details.play_time}</p>
                        {details.has_game === true ?
                            <Button variant="contained" disabled>Already in Queue</Button> 
                            : (
                            <Button variant="contained" color="secondary" onClick={saveGame}>Add Game</Button>
                            
                        )}
                </section>
            )}
        </div>
    )

}

export default Details;