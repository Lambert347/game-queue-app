import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

function SearchItem(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const game = props.game
    console.log(game.game_id);
    const saveGame = () => {
        dispatch({type: 'UPDATE_QUEUE', payload: game})
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
                {game.genre_name}
            </td>
            <td>{game.play_time}</td>
            <td>
                <button onClick={saveGame}>Save</button>
            </td>
        </>
    )
}

export default SearchItem;