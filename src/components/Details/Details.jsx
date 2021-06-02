import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button} from '@material-ui/core';

function Details(){
    const details = useSelector(store => store.details);
    const dispatch = useDispatch();
   
    const [inQueue, setInQueue] = useState(false);
    const queue = useSelector(store => store.queue);
    console.log(details);

    // const saveGame = () => {
    //     dispatch({type: 'UPDATE_QUEUE', payload: details})
    // }

    const {id} = useParams();

    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'});
        checkQueue();
    }, [])

    useEffect (() => {
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }, [])

    const checkQueue = () => {
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].game_id === details[0].game_id) {
                setInQueue(true);
                return inQueue;
            }
            else {
                return inQueue;
            }
        }
    }


    return (
        <div>
            {details[0] === undefined ?
            '' : (
                <section>
                        <p>{details[0].game_title}</p>
                        <img src={details[0].image_url}></img>
                        <p>{details[0].developer}</p>
                        <p>{details[0].publisher}</p>
                        <p>{details[0].genre_name}</p>
                        <p>{details[0].description}</p>
                        <p>{details[0].play_time}</p>
                        {inQueue === true ?
                            <Button variant="disabled">Already in Queue</Button> 
                            : (
                            <Button variant="contained" color="secondary" onClick={saveGame}>Add Game</Button>
                        )}
                </section>
            )}
        </div>
    )

}

export default Details;