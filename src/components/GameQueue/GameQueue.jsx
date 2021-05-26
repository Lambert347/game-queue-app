import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function GameQueue(){
    const dispatch = useDispatch();
    const queue = useSelector(store => store.queue);
    console.log(queue)

    

    const [newQueue, updateNewQueue] = useState(queue);
    console.log(newQueue);
    function onDragEnd(result) {
        if (!result.destination){
            return;
        }
        const games = Array.from(newQueue);
        const [reorderedItem] = games.splice(result.source.index, 1);
        games.splice(result.destination.index, 0, reorderedItem);
        updateNewQueue(games);
    }

    const markComplete = () => {
        console.log('click');
    }

    const removeGame = () => {
        console.log('click')
    }

    

    useEffect(() => {
        updateNewQueue(queue);
    }, [queue])

    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])

    return (
        <div className="Queue">
            <DragDropContext 
                onDragEnd={onDragEnd}
            >
                <table className="games">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Platform</th>
                            <th>Completed?</th>
                            <th>Add Note</th>
                            <th>Remove From Queue</th>
                        </tr>
                    </thead>
                        <Droppable droppableId="game">
                            {(provided) => (
                                <tbody ref={provided.innerRef}
                                {...provided.droppableProps}>
                                    {newQueue.map((item, index) => 
                                    <Draggable draggableId={String(item.game_id)} index={index} key={item.game_id}
                                    >
                                    {(provided) => (
                                        <tr {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        >
                                            <>
                                                <td>{item.game_title}</td>
                                                <td>{item.platform}</td>
                                                <td>
                                                    <button onClick={markComplete}>Mark as Completed</button>
                                                </td>
                                                <td>
                                                    {item.note}
                                                </td>
                                                <td>
                                                    <button onClick={removeGame}>Remove</button>
                                                </td>
                                            </>
                                        </tr>
                                        )}
                                    </Draggable>
                                    )}
                                {provided.placeholder}
                                </tbody>
                            )}
                        </Droppable>
                </table>
            </DragDropContext>
        </div>
    )
}

export default GameQueue;


