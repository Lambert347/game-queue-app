import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';


function QueueItem(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const game = props.game;

    console.log(game.game_id);

    const markComplete = () => {
        dispatch({type: 'UPDATE_GAME', payload: game.game_id})
    }


    const handleClick = () => {
        dispatch({type: 'FETCH_DETAILS', payload: game.game_id})
        history.push('/details');
    }

    return (
        <>
            <TableCell align="right" onClick={handleClick}>{game.game_title}</TableCell>
            <TableCell align="right">{game.platform}</TableCell>
            <TableCell align="right">
                <button onClick={markComplete}>Mark as Completed</button>
            </TableCell>
            <TableCell align="right">
                {game.note}
            </TableCell>
            <TableCell align="right">
                <button onClick={() => dispatch({type: 'REMOVE_GAME', payload: game.game_id})}>Remove</button>
            </TableCell>
        </>
    );
}

export default QueueItem;