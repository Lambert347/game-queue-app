import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState} from 'react';
import SearchItem from '../SearchItem/SearchItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

function SearchGame() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const searchResult = useSelector(store => store.search)

    const searchForGame = () => {
        event.preventDefault();
        console.log(search);
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

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes=useStyles();

    // const useSortableData = (games, config = null) => {
    //     const [sortConfig, setSortConfig] = useState(config);

    //     const sortedGames = React.useMemo(() => {
    //     let sortableGames = [...games];
    //     if (sortConfig !== null) {
    //         sortableGames.sort((a, b) => {
    //             if (a[sortConfig.key] < b[sortConfig.key]) {
    //                 return sortConfig.direction === 'ascending' ? -1 : 1;
    //             }
    //             if (a[sortConfig.key] > b[sortConfig.key]) {
    //                 return sortConfig.direction === 'ascending' ? 1 : -1;
    //             }
    //             return 0;
    //         });
    //     }
    //     return sortableGames;
    //     }, [games, sortConfig]);
        
    //     const requestSort = key => {
    //         let direction = 'ascending';
    //         if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
    //             direction === 'descending';
    //         }
    //         setSortConfig({key, direction});
    //     }
    // return {games: sortedGames, requestSort, sortConfig};
    // }

    // const SearchTable = (props) => {
    //     const {games, requestSort, sortConfig} = useSortableData(props.searchResult)
    //     const getClassNamesFor = (name) => {
    //     if (!sortConfig) {
    //         return;
    //     }
    //     return sortConfig.key === name ? sortConfig.direction : undefined;
    // };
    // } 

    

    return (
        <>
            <div className="searchGame">
                <h2>Search and Save</h2>
                <form onSubmit={searchForGame}>
                    <input onChange={(event) => setSearch(event.target.value)} value={search} placeholder="Game Title"></input>
                    <input onChange={(event) => setGenre(event.target.value)} value={genre} placeholder="Search Genre"></input>
                    <button>Search</button>
                </form>
            </div>
            <TableContainer component={Paper} color="primary">
            <div className="resultsTable">
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Button color="secondary" variant="contained" type="button">
                                    Title
                                </Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button color="secondary" variant="contained" type="button">Platform</Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button color="secondary" variant="contained" type="button">Genre(s)</Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button color="secondary" variant="contained" type="button">Average Playtime</Button>
                            </TableCell>
                            <TableCell align="right">
                                Save Game
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResult.map(game => {
                        return(
                            <TableRow key={game.game_id}>
                                <SearchItem game={game}/>
                            </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            </div>
            </TableContainer>
        </>
    )
}

export default SearchGame;