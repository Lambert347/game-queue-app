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

    const [newQueue, updateNewQueue] = useState(queue);
    function onDragEnd(result) {
        if (!result.destination){
            return;
        }
        const games = Array.from(newQueue);
        const [reorderedItem] = games.splice(result.source.index, 1);
        games.splice(result.destination.index, 0, reorderedItem);
        updateNewQueue(games);
        // dispatch({type: 'CHANGE_ORDER', payload: games})
    }
    

    return (
        <>
            <h3>Profile</h3>
            <div className="buttons">
                <button onClick={goSearch}>Search for Game</button>
                <button onClick={goQueue}>Your Queue</button>
            </div>
            <br />
            {/* <div className="preview">
                {queue.map(game => 
                    <Preview key={game.game_id} game={game}/>
                )}
            </div> */}
            <DragDropContext 
                onDragEnd={onDragEnd}
            >
                <Droppable droppableId="game">
                {(provided) => (
                <div ref={provided.innerRef}
                {...provided.droppableProps}>
                    {queue[0] === undefined ?
                    '' : (
                        <Draggable draggableId={String(queue[0].game_id)} index={queue[0]} key={queue[0].game_id}
                        >
                        {(provided) => (
                        <div {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef} 
                        >
                                <img src={queue[0].image_url}></img>
                                <br />
                                {queue[0].description}
                            
                        </div>
                        )}
                        </Draggable>
                        )}
                        <br />
                    {queue[1] === undefined ?
                    '' : (
                        <Draggable draggableId={String(queue[1].game_id)} index={queue[1]} key={queue[1].game_id}
                        >
                        {(provided) => (
                        <div {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        >
                                <img src={queue[1].image_url}></img>
                                <br />
                                {queue[1].description}
                            
                        </div>
                        )}
                        </Draggable>
                        )}
                        <br />
                    {queue[2] === undefined ?
                    '' : (
                        <Draggable draggableId={String(queue[2].game_id)} index={queue[2]} key={queue[2].game_id}
                        >
                        {(provided) => (         
                        <div {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        >
                                <img src={queue[2].image_url}></img>
                                <br />
                                {queue[2].description}
                            
                        </div>
                        )} 
                        </Draggable>
                        )}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

export default Profile;
