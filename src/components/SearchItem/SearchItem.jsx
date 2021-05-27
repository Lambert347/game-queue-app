import { useDispatch } from 'react-redux';

function SearchItem(props) {
    const dispatch = useDispatch();
    const game = props.game
    console.log(game.game_id);
    const saveGame = () => {
        dispatch({type: 'UPDATE_QUEUE', payload: game})
    }
    return (
        <>
            <td>{game.game_title}</td>
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