import { useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import ReactDom from 'react-dom';
import {useDispatch, useSelector, } from 'react-redux'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import Preview from '../Preview/Preview';

function Profile(){
    const queue = useSelector((store) => store.game);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(queue);

    const goQueue = () => {
        history.push(`/profile/queue`);
    }

    const goSearch = () => {
        history.push('/search');
    }


    useEffect (() => {
        dispatch({type: 'FETCH_GAMES'});
    }, [])

    

    return (
        <>
            <h3>Profile</h3>
            <div className="buttons">
                <button onClick={goSearch}>Search for Game</button>
                <button onClick={goQueue}>Your Queue</button>
            </div>
            <div className="preview">
                {queue.map(game => 
                    <Preview key={game.id} game={game}/>
                )}
            </div>
        </>
    );
}

export default Profile;
