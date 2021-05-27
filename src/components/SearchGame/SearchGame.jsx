import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import SearchItem from '../SearchItem/SearchItem';

function SearchGame() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const searchResult = useSelector(store => store.search)

    const searchForGame = () => {
        event.preventDefault();
        console.log(search);
        if (search !== '') {
            axios.get('/api/search', {
                params: {
                    search: search
                }
            })
            .then(response => {
                dispatch({type: 'SET_SEARCH', payload: response.data});
            })
            .then(setSearch(''))
            .catch(error => {
                console.log(`Error searching for ${search}:`, error);
            })
        }
        else if (search === '') {
            dispatch({type: 'FETCH_GAMES'})
        }
    }

    

    return (
        <>
            <div className="searchGame">
                <h2>Search and Save</h2>
                <form onSubmit={searchForGame}>
                    <input onChange={(event) => setSearch(event.target.value)} value={search}></input>
                    <button>Search</button>
                </form>
            </div>
            <div className="resultsTable">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Platform</th>
                            <th>Genre(s)</th>
                            <th>Average Playtime</th>
                            <th>Save Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.map(game => {
                        return(
                            <tr key={game.game_id}>
                                <SearchItem game={game}/>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                
                
            </div>
        {/* {searchResult[0] === undefined ?
        '' : (
            <>
           
             </>
            )} */}
        </>
    )
}

export default SearchGame;