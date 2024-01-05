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

    //grabs the error messages from the store to be used later in this component 
    const errors = useSelector((store) => store.errors);

    //declares constants and initial states. These will be used to send the information from the inputs to the server to be stored in the database
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [playTime, setPlayTime] = useState('');
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [genreId, setGenreId] = useState('')

    //this constant is set to an initial value of false. This is primarily to make the popup window behave properly. 
    const [toggleOk, setToggleOk] = useState(false);

    //constant that gets the genres from the store which gets them from the database. This is for attaching a genre to the new game via the drop-down menu below
    const genre = useSelector((store) => store.genre);
    console.log(genre);

    //takes the imported style file and creates a new classes constant to use for styling the various elements below
    const classes = useStyles();
   
    //newGame object to be sent to the server after the inputs are taken
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

    //basic function to clear inputs for the next game
    const clearFields = () => {
        setDescription('');
        setUrl('');
        setDeveloper('');
        setPublisher('');
        setPlayTime('');
        setTitle('');
        setPlatform('');
        setGenreId('');
        setToggleOk(false);
    }


    //dispatch to take the inputs and dispatch to the saga with the newGame object as a payload, then clears the fields and sets the toggleOk variable to true
    const addGame = (event) => {
        dispatch({type: 'ADD_NEW_GAME', payload: newGame})
        clearFields();
        setToggleOk(true);
    }

    //refreshes the window
    const refreshPage = () => {
        window.location.reload(false);
    }

    //makes the dispatch right when the page loads to get the genres from the server
    useEffect(() => {
        dispatch({type: 'FETCH_GENRE'})
    }, [])
    //sets toggleOk variable to false right when the page loads. This, when in conjunction with the refreshPage function, resets the toggleOk variable 
    //so that the popup window cycles and dispatches correctly
    useEffect(() => {
        setToggleOk(false)
    }, [])

    //renders the page to the dom
    return (
        <>
        <div className={classes.addImage}>

            {/* This div essentially renders the header instructing the user what to do on this page */}
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
            {/* <img src="https://external-preview.redd.it/aBy_l6ITXTGkCnN_sS3aDa2LXLr0E8hqef3jZ-bqeK4.png?auto=webp&s=dd8851d59ddad2a64100f64ed8cc9cb71a2eb11e" style={{position: 'absolute', right: 0, width: '450px', marginRight: '150px', border:'1px #DCDCDC', borderRadius: '10px'}}/>
            <img src="https://cdna.artstation.com/p/assets/images/images/031/111/458/large/pierre-roussel-gamecube-web-indigo.jpg?1602629620" style={{position: 'absolute', left: 0, width: '450px', marginLeft: '150px', border:'1px #DCDCDC', borderRadius: '10px'}}/> */}
            
            {/* Renders the actual form to the page  */}
            <div>
                <Grid className={classes.addForm} container spacing={2} justify="center">
                    <FormControl className={classes.formControl}>
                        <Grid item>
                            <InputLabel>Genre</InputLabel>
                            
                            {/* renders the dropdown menu for the genres, takes the genreId of the select genre and sends it to the server as part of the newGame object when the form is submitted */}
                            <Select fullWidth value={genre.id} defaultValue = "" name='genreId' className={classes.select} onChange={(event) => setGenreId(event.target.value)}>
                                    {genre.map(genre => {
                                        return <MenuItem key={genre.id} value={genre.id}>{genre.genre_name}</MenuItem>
                                    })}
                            </Select>
                        </Grid>
                        <br></br>

                        {/* renders the text fields that the user types their values into. These are required, and work in conjunction with the errors to ensure that the user is not sending bad data */}
                        {/* when the form is submitted via the popup, the values are packaged into the newGame object and dispatched to the server */}
                        <Grid item>
                            <TextField fullWidth onChange={(event) => setTitle(event.target.value)} value={title} placeholder="Game Title" required/>
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField fullWidth onChange={(event) => setPlayTime(event.target.value)} value={playTime} placeholder="Average Play Time" required/>
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField fullWidth onChange={(event) => setDeveloper(event.target.value)} value={developer} placeholder="Developer" required />
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField fullWidth onChange={(event) => setDescription(event.target.value)} value={description} placeholder="Description" required />
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField fullWidth onChange={(event) => setPublisher(event.target.value)} value={publisher} placeholder="Publisher" required />
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField fullWidth onChange={(event) => setUrl(event.target.value)} value={url} placeholder="Image Url" required/>
                        </Grid>
                        <br></br>
                        <Grid item>
                            <TextField fullWidth onChange={(event) => setPlatform(event.target.value)} value={platform} placeholder="Platform" required/>
                        </Grid>
                        <br />

                        {/* renders the popup to dom. The trigger is the add game button */}
                        <Popup color="primary" trigger={ <Button color="primary" variant="contained" >Add Game</Button>}
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

                                    {/* if toggleOk is false, renders the following */}
                                    {/* asks the suer to confirm that they want to add the game, giving them a chance to cancel by simply closing the popup */}
                                    {/* if the user clicks the yes! button, then the game is dispatched to the server */}
                                    {toggleOk === false ?
                                    <>
                                        <p>Are you sure you want to add this game to the library?</p>
                                        <p>Click the Yes button to confirm, and the x to cancel.</p>
                                        <Button color="primary" variant="contained" onClick={addGame}>Yes!</Button>
                                    </>

                                    // if the toggleOK variable is true, then the popup informs the user that their game was correctly added and is now searchable 
                                    // the ok button both closes the popup and also refreshes the page, this resets the toggleOk variable, which makes sure that the popup will open correctly the next time a game is entered
                                    : (
                                        <>
                                            <p>Thank you for contributing! Your new game is now searchable!</p>
                                            <Button onClick={function(){close(); refreshPage();}}>Ok</Button>
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

