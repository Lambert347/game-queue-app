import { useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import ReactDom from 'react-dom';
import {useDispatch, useSelector, } from 'react-redux'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import Preview from '../Preview/Preview';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import useStyles from '../App/style';
import Container from '@material-ui/core/Container';



function Profile(){
    const queue = useSelector((store) => store.queue);
    const user = useSelector((store) => store.user);
    console.log(user);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(queue);
    const classes = useStyles();

    const goQueue = () => {
        history.push(`/queue`);
    }

    const goSearch = () => {
        history.push('/search');
    }

    const theme = useTheme();


    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])
    
    
    const [newQueue, updateNewQueue] = useState(queue);
    let [splicedQueue, setSplicedQueue] = useState(newQueue);
    function onDragEnd(result) {
        if (!result.destination){
            return;
        }
        const games = Array.from(newQueue);
        const [reorderedItem] = games.splice(result.source.index, 1);
        games.splice(result.destination.index, 0, reorderedItem);
        updateNewQueue(games);
        // dispatch({type: 'CHANGE_ORDER', payload: games})
    }
    

    return (
        <>
            <h3>Profile</h3>
            <div className="buttons">
                <Button color="secondary" variant="contained" onClick={goSearch}>Search for Game</Button>
                <br />
                <br />
                <Button color="secondary" variant="contained" onClick={goQueue}>Your Queue</Button>
            </div>
            <br />
            <DragDropContext 
                onDragEnd={onDragEnd}
            >
                    <Droppable droppableId="game">
                    {(provided) => (
                    <div ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{position: "relative"}}>
                        <Container className={classes.cardGrid} maxWidth="xs">
                            <Grid container spacing={4}>
                                {queue.map((game, index) => 
                                <Draggable draggableId={String(game.game_id)} index={index} key={game.game_id}>
                                {(provided) => (
                                    <Card className={classes.card} {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    justify="space-between"
                                    >
                                        <CardActionArea>
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
                                            <Button size="small" color="secondary">Move to End of Queue</Button>
                                        </CardActions>
                                    </Card>
                                    )}
                                </Draggable>
                                )}
                            {provided.placeholder}
                            </Grid>
                        </Container>   
                    </div>
                    )}
                    </Droppable>
                
            
            </DragDropContext>
        </>
    );
}

export default Profile;
