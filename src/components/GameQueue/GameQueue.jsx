import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import QueueItem from '../QueueItem/QueueItem'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useStyles from '../App/style.js'
import GridLayout from 'react-grid-layout';
import {Responsive as ResponsiveGridLayout} from 'react-grid-layout';
import {ListManager} from "react-beautiful-dnd-grid"

function GameQueue(){
    const dispatch = useDispatch();

    //constant of queue that gets its value from the store, this queue is specific to the user that is logged in
    const queue = useSelector(store => store.queue);
    
    //this newQueue constant's default state is set to that of the user's queue. This newQueue is the array that is altered by the drag and drop
    const [newQueue, updateNewQueue] = useState(queue);
    
    //sets the state of the newQueue to the queue when the page loads
    useEffect(() => {
        updateNewQueue(queue);
    }, [queue])

    //dispatch to fetch the queue from the server right when the page loads
    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])

    //readies the style.js file for use in this component 
    const classes = useStyles();

    //function to handle when a draggable element is dropped into a new position
    function onDragEnd(result) {

        // if the draggable element is dropped outside of the droppable area, the element will snap back to its original position
        // this prevents the page from crashing if an element is dropped outside the droppable area
        if (!result.destination){
            return;
        }

        //creates a new games area from the newQueue array
        const games = Array.from(newQueue);

        //handles the reordering of that new games array
        //uses the source index of the dragged item, splices it out of the games array, and then updates the games array to splice that element into its new position using the destination index
        const [reorderedItem] = games.splice(result.source.index, 1);
        games.splice(result.destination.index, 0, reorderedItem);

        //updates the newQueue state to reflect the changes from the games array after the splicing the dragged element into it's new position in the array
        updateNewQueue(games);

        //creates a new constant of updatedGames set to the value of the games array after it has been updated through drag and drop
        //this is for the purposes of updating the queue for the user on the server side, preserving that new order between pages and when the user logs out and back in
        const updatedGames = Array.from(games);

        //runs the updateOrder function using the updateGames array
        updateOrder(updatedGames);
        
    }

    //function to update the order of the queue
    const updateOrder = (updatedGames) => {
        
        // basic for loop to run through the updatedGames array
       for (let i = 0; i < updatedGames.length; i++) {

            // changes the value of order_number for each game in the queue to be the index of the array 
            // since arrays start at 0 and the order_number in the database starts at 1, the new order_number for each game is set to their new index + 1
           updatedGames[i].order_number = (i + 1)
       }

       //dispatch to change the order in the server, with the payload of the updateGames array after the order has been altered by the for loop
       dispatch({type: 'CHANGE_ORDER', payload: updatedGames})
    }
    
    // renders the page to the dom
    return (
        <>
        <div className={classes.cardWrap}>
            <Container>
                <Typography variant="h2" align="center" gutterBottom color="secondary">
                    Your Queue
                </Typography>
            </Container>

            {/* DragDropContext declares an area of the DOM in which the drag and dropping occurs */}
            <DragDropContext 
                onDragEnd={onDragEnd}
                className={classes.dragDropContext}
            >       

                {/* droppable declares the specific area that elements can be dropped into. In this case, it is the card grid that is the area elements can be moved around in */}
                <Droppable droppableId="game" display='flex'>
                    {(provided) => (
                    <div className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4} maxWidth='true' alignContent='center' justifyContent='center'>
                        <div ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {newQueue.map((item, index) => 
                            <Draggable draggableId={String(item.game_id)} index={index} key={item.game_id}
                            >
                            {(provided) => (
                            <Grid item key={item.game_id} className={classes.gridItem} md={4}>
                                <Card className={classes.card} ref={provided.innerRef} {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                    <QueueItem game={item}/>
                                </Card>
                            </Grid>
                            )}
                            </Draggable>
                            )}
                        {provided.placeholder}
                        </div> 
                        </Grid>
                    </div>
                    )} 
                </Droppable>
            </DragDropContext>
        </div>
        </>
    )
}

export default GameQueue;


