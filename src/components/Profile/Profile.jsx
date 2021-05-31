import { useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import ReactDom from 'react-dom';
import {useDispatch, useSelector, } from 'react-redux'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import Preview from '../Preview/Preview';
import { useTheme } from '@material-ui/core/styles';

function Profile(){
    const queue = useSelector((store) => store.queue);
    const user = useSelector((store) => store.user);
    console.log(user);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(queue);

    const goQueue = () => {
        history.push(`/queue`);
    }

    const goSearch = () => {
        history.push('/search');
    }

    const theme = useTheme();


    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])

    

    return (
        <>
        <div>
            <h3>Profile</h3>
            <div className="buttons">
                <button onClick={goSearch}>Search for Game</button>
                <button onClick={goQueue}>Your Queue</button>
            </div>
            {/* <div className="preview">
                {queue.map(game => 
                    <Preview key={game.game_id} game={game}/>
                )}
            </div> */}
                <>
                {queue[0] === undefined ?
                 '' : (
                    <div>
                            <img src={queue[0].image_url}></img>
                            <br />
                            {queue[0].description}
                        
                    </div>
                    )}
                    <br />
                {queue[1] === undefined ?
                 '' : (
                    <div>
                            <img src={queue[1].image_url}></img>
                            <br />
                            {queue[1].description}
                        
                    </div>
                    )}
                    <br />
                {queue[2] === undefined ?
                 '' : (
                    <div>
                            <img src={queue[2].image_url}></img>
                            <br />
                            {queue[2].description}
                        
                    </div>
                    )}
                </>
        </div>
        </>
        
    );
}

export default Profile;
