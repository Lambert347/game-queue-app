import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function Details(){
    const details = useSelector(store => store.details);
    const dispatch = useDispatch();
   
    let inQueue = false;
    const queue = useSelector(store => store.queue);
    console.log(queue);
    console.log(details);

    const saveGame = () => {
        dispatch({type: 'UPDATE_QUEUE', payload: details})
    }

    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])

    // for (let i = 0; i < queue.length; i++) {
    //     if (details.id === queue[i].id) {
    //         inQueue = true;
    //         return inQueue;
    //     }
    //     else {
    //         inQueue = false;
    //         return inQueue;
    //     }
    // }

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
                        {/* {inQueue === true ?
                        <p>Game Already in Queue</p> : (
                            <button onClick={saveGame}></button>
                        )} */}
                </section>
            )}
        </div>
    )

}

export default Details;