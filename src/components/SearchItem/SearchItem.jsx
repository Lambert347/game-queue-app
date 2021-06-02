import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';

function SearchItem(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const game = props.game
    console.log(game.game_id);
    const saveGame = () => {
        dispatch({type: 'UPDATE_QUEUE', payload: game})
    }

    const handleClick = () => {
        dispatch({type: 'SET_DETAILS', payload: game.game_id})
        history.push(`/details/${game.game_id}`);
    }

    return (
        <>
            <TableCell onClick={handleClick}>{game.game_title}</TableCell>
            <TableCell align="right">{game.platform}</TableCell>
            <TableCell align="right">
                {game.genre_name}
            </TableCell>
            <TableCell align="right">{game.play_time}</TableCell>
            <TableCell align="right">
                <button onClick={saveGame}>Save</button>
            </TableCell>
        </>
    )
}

export default SearchItem;