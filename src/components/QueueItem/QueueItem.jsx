import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Button, TextField, Typography} from '@material-ui/core';
import './Modal.css';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from '../App/style.js'



function QueueItem(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const game = props.game;
    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState('');


    const classes = useStyles();
    



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

    const seeDetails = () => {
        dispatch({type: 'SET_DETAILS', payload: game.game_id});
        dispatch({type: 'FETCH_USER_GAMES'});
        history.push(`/details/${game.game_id}`);
    }

    return (
        <>
            <CardActionArea onClick={seeDetails}>
                <CardMedia
                    className={classes.image}
                >
                    <img src={game.image_url}></img>
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {game.game_title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {game && game.note ?
                <div>
                    <Popup color="primary" trigger={<Button color="secondary" className="button">See Note</Button>} position="right center"
                    modal
                    nested
                    >
                    {close => (
                        <div className="modal">
                            <Button className="close" onClick={close}>
                                &times;
                            </Button>
                            <div className="header">Note</div>
                            <div className="content">
                                {' '}
                                {game.note}
                            </div>
                        </div>
                        )}
                    </Popup>
                </div>
                :
                <div>
                    <Popup color="primary" trigger={<Button color="secondary" variant="contained" className="button">Add Note</Button>} position="right center"
                    modal
                    nested 
                    >
                        {close => (
                            <div className="modal">
                                <Button className="close" onClick={close}>
                                    &times;
                                </Button>
                                <div className="header">Add a note</div>
                                <div className="content">
                                    {' '}
                                    <form onSubmit={addNote}>
                                        <TextField onChange={(event) => setNote(event.target.value)}></TextField>
                                        <br />
                                        <Button color="secondary" variant="contained" onClick={addNote}>Add Note</Button>
                                    </form>
                                </div>
                                <div className="actions">
                                    <Button color="secondary" variant="outlined"
                                        className="button"
                                        onClick={() => {
                                            close();
                                        }}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            }
            <Button onClick={() => dispatch({type: 'REMOVE_GAME', payload: game.game_id})}>Remove</Button>
            </CardActions>
            
            








            {/* <TableCell align="right" onClick={seeDetails}>{game.game_title}</TableCell>
            <TableCell align="right">{game.platform}</TableCell>
            <TableCell align="right">
                <button onClick={markComplete}>Mark as Completed</button>
            </TableCell>
            <TableCell align="right">
                {game && game.note ?
                    <div>
                        <Popup color="primary" trigger={<Button color="secondary" className="button">See Note</Button>} position="right center"
                        modal
                        nested
                        >
                            {close => (
                                <div className="modal">
                                    <Button className="close" onClick={close}>
                                        &times;
                                    </Button>
                                    <div className="header">Note</div>
                                    <div className="content">
                                        {' '}
                                        {game.note}
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                    :
                    <div>
                        <Popup color="primary" trigger={<Button color="secondary" variant="contained" className="button">Add Note</Button>} position="right center"
                        modal
                        nested 
                        >
                            {close => (
                                <div className="modal">
                                    <Button className="close" onClick={close}>
                                        &times;
                                    </Button>
                                    <div className="header">Add a note</div>
                                    <div className="content">
                                        {' '}
                                        <form onSubmit={addNote}>
                                            <TextField onChange={(event) => setNote(event.target.value)}></TextField>
                                            <br />
                                            <Button color="secondary" variant="contained" onClick={addNote}>Add Note</Button>
                                        </form>
                                    </div>
                                    <div className="actions">
                                        <Button color="secondary" variant="outlined"
                                            className="button"
                                            onClick={() => {
                                                close();
                                            }}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                }
            </TableCell>
            <TableCell align="right">
                <button onClick={() => dispatch({type: 'REMOVE_GAME', payload: game.game_id})}>Remove</button>
            </TableCell> */}
        </>
    );
}

export default QueueItem;