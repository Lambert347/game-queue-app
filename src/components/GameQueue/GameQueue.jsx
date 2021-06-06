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
    const queue = useSelector(store => store.queue);
    console.log(queue)

    useEffect(() => {
        updateNewQueue(queue);
    }, [queue])

    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])

    const classes = useStyles();


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
        updateOrder(updatedGames);
        
    }

    
    const updateOrder = (updatedGames) => {
       for (let i = 0; i < updatedGames.length; i++) {
           updatedGames[i].order_number = (i + 1)
       }
       dispatch({type: 'CHANGE_ORDER', payload: updatedGames})
    }

    // const ListElement = props => <div ref={provided.innerRef}
    // {...provided.droppableProps}>
    //     <Draggable draggableId={String(props.item.game_id)} index={index} key={props.item.game_id}
    //                                         >
    //     <Card className={classes.card}>
    //         <QueueItem game={props.item}/>
    //     </Card>
    //     </Draggable>
    //     </div>;

    
    return (
        <div className="Queue">
            <Container maxWidth="sm">
                <Typography variant="h2" align="center" gutterBottom color="secondary">
                    Your Queue
                </Typography>
            </Container>
            <DragDropContext 
                onDragEnd={onDragEnd}
            >       
                <Droppable droppableId="game">
                    {(provided) => (
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                        {/* <ListManager 
                        items={newQueue}
                        direction="horizontal"
                        maxItems={3}
                        onDragEnd={onDragEnd}
                        render={item => <ListElement item={item}/>}
                        /> */}
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
                    </Container>
                    )} 
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default GameQueue;


