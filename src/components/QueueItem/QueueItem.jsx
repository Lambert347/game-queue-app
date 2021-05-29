import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';


function QueueItem(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const game = props.game;

    console.log(game.game_id);

    const markComplete = () => {
        console.log('click');
        console.log(newQueue[0]);
    }


    const handleClick = () => {
        dispatch({type: 'FETCH_DETAILS', payload: game.game_id})
        history.push('/details');
    }

    return (
        <>
            <td onClick={handleClick}>{game.game_title}</td>
            <td>{game.platform}</td>
            <td>
                <button onClick={markComplete}>Mark as Completed</button>
            </td>
            <td>
                {game.note}
            </td>
            <td>
                <button onClick={() => dispatch({type: 'REMOVE_GAME', payload: game.game_id})}>Remove</button>
            </td>
        </>
    );
}

export default QueueItem;