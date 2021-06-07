import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Button, TextField} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../QueueItem/Modal.css';
import useStyles from '../App/style.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

function AddGame() {
    const dispatch = useDispatch();
    const errors = useSelector((store) => store.errors);


    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [playTime, setPlayTime] = useState('');
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [genreId, setGenreId] = useState('')

    const [toggleOk, setToggleOk] = useState(false);

    const genre = useSelector((store) => store.genre);
    console.log(genre);

    const classes = useStyles();
   

    const newGame = {
        game_title: title,
        play_time: playTime,
        developer: developer,
        description: description,
        publisher: publisher,
        image_url: url,
        platform: platform,
        genre: genreId,
    }

    const clearFields = () => {
        setDescription('');
        setUrl('');
        setDeveloper('');
        setPublisher('');
        setPlayTime('');
        setTitle('');
        setPlatform('');
        setGenreId('');
    }



    const addGame = (event) => {
        event.preventDefault();
        dispatch({type: 'ADD_NEW_GAME', payload: newGame})
        clearFields();
        setToggleOk(true);
    }


    useEffect(() => {
        dispatch({type: 'FETCH_GENRE'})
    }, [])
 
    return (
        <>
        <div className={classes.addImage}>
            <div>
                <Container className={classes.addHeader} maxWidth="sm">
                    <Typography variant="h3" align="center" gutterBottom>
                        Add a game to the library:
                    </Typography>
                    <Typography variant="h4" align="center" gutterBottom>
                        Make sure all the fields are correct and then submit!
                    </Typography>
                    {errors.addMessage && (
                        <h3 className="alert" role="alert">
                            {errors.addMessage}
                        </h3>
                    )}
                </Container>
            </div>
            <br />
            <img src="https://external-preview.redd.it/aBy_l6ITXTGkCnN_sS3aDa2LXLr0E8hqef3jZ-bqeK4.png?auto=webp&s=dd8851d59ddad2a64100f64ed8cc9cb71a2eb11e" style={{position: 'absolute', right: 0, width: '450px', marginRight: '150px', border:'1px #DCDCDC', borderRadius: '10px'}}/>
            <img src="https://cdna.artstation.com/p/assets/images/images/031/111/458/large/pierre-roussel-gamecube-web-indigo.jpg?1602629620" style={{position: 'absolute', left: 0, width: '450px', marginLeft: '150px', border:'1px #DCDCDC', borderRadius: '10px'}}/>
            <div>
                <Grid className={classes.addForm} container spacing={2} justify="center">
                    <FormControl className={classes.formControl}>
                        <Grid item>
                            <InputLabel>Genre</InputLabel>
                            <Select value={genre.id} defaultValue = "" name='genreId' className={classes.select} onChange={(event) => setGenreId(event.target.value)}>
                                    {genre.map(genre => {
                                        return <MenuItem key={genre.id} value={genre.id}>{genre.genre_name}</MenuItem>
                                    })}
                            </Select>
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField onChange={(event) => setTitle(event.target.value)} value={title} placeholder="Game Title" required/>
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField onChange={(event) => setPlayTime(event.target.value)} value={playTime} placeholder="Average Play Time" required/>
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField onChange={(event) => setDeveloper(event.target.value)} value={developer} placeholder="Developer" required />
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField onChange={(event) => setDescription(event.target.value)} value={description} placeholder="Description" required />
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField onChange={(event) => setPublisher(event.target.value)} value={publisher} placeholder="Publisher" required />
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField onChange={(event) => setUrl(event.target.value)} value={url} placeholder="Image Url" required/>
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField onChange={(event) => setPlatform(event.target.value)} value={platform} placeholder="Platform" required/>
                        </Grid>
                        <br />
                        <Popup color="primary" trigger={ <Button onClick={addGame} color="primary" variant="contained" >Add Game</Button>}
                        modal
                        nested
                        >
                        {close => (
                            <div className="modal" style={{justifyContent: 'center'}}>
                                <Button className="close" onClick={close}>
                                    &times;
                                </Button>
                                <div className="header">Thanks!</div>
                                <div className="content" style={{textAlign: 'center'}}>
                                    {' '}
                                    {toggleOk === false ?
                                    <>
                                        <p>Are you sure you want to add this game to the library?</p>
                                        <p>Click the Yes button to confirm, and the x to cancel.</p>
                                        <Button color="primary" variant="contained" onClick={addGame}>Yes!</Button>
                                    </>
                                    : (
                                        <>
                                            <p>Thank you for contributing! Your new game is now searchable!</p>
                                            <Button onClick={close}>Ok</Button>
                                        </>
                                    )
                                }   
                                </div>  
                            </div>
                        )}
                        </Popup>
                    </FormControl>
                </Grid>
            </div>
            
        </div>
        </>
    );
}

export default AddGame;

