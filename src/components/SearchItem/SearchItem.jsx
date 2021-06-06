import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import useStyles from '../App/style.js'
import { Typography, Button } from '@material-ui/core';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import { useState, useEffect} from 'react';

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
        dispatch({type: 'FETCH_USER_GAMES'});
        history.push(`/details/${game.game_id}`);
    }
    const handleClickAlt = () => {
        dispatch({type: 'SET_DETAILS', payload: game.id})
        dispatch({type: 'FETCH_USER_GAMES'});
        history.push(`/details/${game.id}`);
    }
    const classes = useStyles();

    

    return (
        <>
        {game.game_id === undefined ? 
        <>
            <CardActionArea onClick={handleClickAlt}>
            <CardMedia className={classes.image}>
                <img src={game.image_url}></img>
            </CardMedia>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {game.game_title}
                    
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    {game.platform}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    {game.genre_name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    Average Playtime: {game.play_time}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button color="secondary" variant="contained" onClick={saveGame}><FavoriteTwoToneIcon/></Button>
            </CardActions>
        </>
    : (
        <>
            <CardActionArea onClick={handleClick}>
                <CardMedia className={classes.image}>
                    <img src={game.image_url}></img>
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {game.game_title}
                        
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {game.platform}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {game.genre_name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        Average Playtime: {game.play_time}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button color="secondary" variant="contained" onClick={saveGame}><FavoriteTwoToneIcon/></Button>
            </CardActions>
        </>
        )
    }
        </>
    )
}

export default SearchItem;