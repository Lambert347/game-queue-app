import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect} from 'react';
import SearchItem from '../SearchItem/SearchItem';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Paper from '@material-ui/core/Paper';
import {Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from '../App/style.js';




function SearchGame() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [toggleSearch, setToggleSearch] = useState(false);
    const searchResult = useSelector((store) => store.search);
    const searchGenre = useSelector((store) => store.genre);
    const games = useSelector((store) => store.game)

    const searchForGame = () => {
        event.preventDefault();
        setToggleSearch(true);
            axios.get('/api/search', {
                params: {
                    search: search,
                    genre: genre,
                }
            })
            .then(response => {
                dispatch({type: 'SET_SEARCH', payload: response.data});
            })
            .then(setSearch(''))
            .then(setGenre(''))
            .catch(error => {
                console.log(`Error searching for ${search}:`, error);
            })
        }

    const classes = useStyles();

    useEffect(() => {
        dispatch({type: 'FETCH_GENRE'})
    }, [])
    useEffect(() => {
        dispatch({type: 'FETCH_GAMES'})
    }, [])
 
    

    return (
        <>
        <h2>Search and Save</h2>
            <form onSubmit={searchForGame}>
                <input onChange={(event) => setSearch(event.target.value)} value={search} placeholder="Game Title"></input>
                <InputLabel>Genre</InputLabel>
                <Select value={searchGenre.genre_name} defaultValue = "" name='genreId' onChange={(event) => setGenre(event.target.value)}>
                    {searchGenre.map(genre => {
                        return <MenuItem key={genre.id} value={genre.genre_name}>{genre.genre_name}</MenuItem>
                    })}
                </Select>
                <button>Search</button>
            </form>
        {toggleSearch === false ?
           <div>
            {games[0] === undefined ?
            '': (
                <Container className={classes.searchGrid} maxWidth="md">
                    <Grid container spacing={4}>
                    {games.map((game, index) => 
                       <Grid item className={classes.searchItem} key={game.id} md={4}>
                           <Card className={classes.searchCard}>
                               <SearchItem game={game} />         
                           </Card>
                       </Grid>
                    )}
                    </Grid>
                </Container>
            )}
       </div>
        : (
        
        <div className="searchGame">
            <Container maxWidth="sm">
                <Typography variant="h2" align="center" gutterBottom color="secondary">
                    Search Results
                </Typography>
            </Container>
            <div>
                <Container className={classes.searchGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {searchResult.map((game, index) => 
                            <Grid className={classes.searchItem} item key={game.game_id} md={4}>
                                <Card className={classes.searchCard}>
                                    <SearchItem game={game} />         
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </div>
        </div>
        
    )
            }      
        </>
    );
}

export default SearchGame;