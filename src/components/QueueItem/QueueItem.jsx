import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function QueueItem(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const game = props.game;
    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState('');

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const markComplete = () => {
        dispatch({type: 'UPDATE_GAME', payload: game.game_id})
    }

    const seeNote = () => {
        console.log('Click')
    }

    const addNote = () => {
        const updatedGame = {
            note: note,
            id: game.game_id,
        }
        dispatch({type: 'UPDATE_NOTE', payload: updatedGame})
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
                {game && game.note ?
                    <div>
                        <Popup trigger={<button>See note</button>} position="right center">
                            <button onClick={seeNote}>See note</button>
                        </Popup>
                    </div>
                    :
                    <div>
                        <Popup trigger={<button>Add Note</button>} position="right center">
                            <form onSubmit={addNote}>
                                <textarea onChange={(event) => setNote(event.target.value)}></textarea>
                                <button>Add Note</button>
                            </form>
                        </Popup>
                    </div>
                }
            </TableCell>
            <TableCell align="right">
                <button onClick={() => dispatch({type: 'REMOVE_GAME', payload: game.game_id})}>Remove</button>
            </TableCell>
        </>
    );
}

export default QueueItem;