import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

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

    

    useEffect(() => {
        updateNewQueue(queue);
    }, [queue])

    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])

    return (
        <div className="Queue">
                <table className="games">
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                </table>
        </div>
    )


}

export default GameQueue;


