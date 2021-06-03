import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import QueueItem from '../QueueItem/QueueItem'
import Pagination from '../Pagination/Pagination'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function GameQueue(){
    const dispatch = useDispatch();
    const queue = useSelector(store => store.queue);
    console.log(queue)
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(10);
    // const [updatedGames, updateUpdatedGames] = useState([]);

    useEffect(() => {
        updateNewQueue(queue);
    }, [queue])

    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes=useStyles();


    const [newQueue, updateNewQueue] = useState(queue);
    function onDragEnd(result) {
        if (!result.destination){
            return;
        }
        const games = Array.from(newQueue);
        const [reorderedItem] = games.splice(result.source.index, 1);
        games.splice(result.destination.index, 0, reorderedItem);
        updateNewQueue(games);
        console.log('Checking new queue:', games)
        const updatedGames = Array.from(games);
        console.log(updatedGames);
        updateOrder(updatedGames);
        
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const updateOrder = (updatedGames) => {
       for (let i = 0; i < updatedGames.length; i++) {
           updatedGames[i].order_number = (i + 1)
           console.log(updatedGames[i].order_number);
       }
       console.log(updatedGames);
       dispatch({type: 'CHANGE_ORDER', payload: updatedGames})
    }

    
   
    
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = newQueue.slice(indexOfFirstGame, indexOfLastGame);

    return (
        <div className="Queue">
        <TableContainer component={Paper} color="primary">
            <DragDropContext 
                onDragEnd={onDragEnd}
            >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Platform</TableCell>
                            <TableCell align="right">Completed?</TableCell>
                            <TableCell align="right">Add Note</TableCell>
                            <TableCell align="right">Remove From Queue</TableCell>
                        </TableRow>
                    </TableHead>
                        <Droppable droppableId="game">
                            {(provided) => (
                                <TableBody ref={provided.innerRef}
                                {...provided.droppableProps}>
                                    {currentGames.map((item, index) => 
                                    <Draggable draggableId={String(item.game_id)} index={index} key={item.game_id}
                                    >
                                    {(provided) => (
                                        <TableRow {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        >
                                            <QueueItem game={item} queue={currentGames}/>
                                        </TableRow>
                                        )}
                                    </Draggable>
                                    )}
                                {provided.placeholder}
                                </TableBody>
                            )}
                        </Droppable>
                </Table>
            </DragDropContext>
            <Pagination gamesPerPage={gamesPerPage} totalGames={newQueue.length} paginate={paginate}/>
        </TableContainer>
        </div>
    )
}

export default GameQueue;


