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

    const sendEnd = (event, game) => {
        dispatch({type: 'MOVE_TO_END', payload: game});
    }



    useEffect (() => {
        dispatch({type: 'FETCH_USER_GAMES'})
    }, [])
    
    useEffect(() => {
        updateNewQueue(queue);
    }, [queue])
    
    const [newQueue, updateNewQueue] = useState(queue);
    let [splicedQueue, setSplicedQueue] = useState(newQueue);
    function onDragEnd(result) {
        if (!result.destination){
            return;
        }
        const games = Array.from(newQueue);
        const [reorderedItem] = games.splice(result.source.index, 1);
        games.splice(result.destination.index, 0, reorderedItem);
        const updatedGames = Array.from(games);
        updateNewQueue(games);
        updateOrder(updatedGames);
    }

    const updateOrder = (updatedGames) => {
        for (let i = 0; i < updatedGames.length; i++) {
            updatedGames[i].order_number = (i + 1)
        }
        dispatch({type: 'CHANGE_ORDER', payload: updatedGames})
    }
    

    return (
        <>
            <Container maxWidth="sm">
                <Typography variant="h2" fontWeight="bold" align="center" gutterBottom color="secondary">
                    Your Profile
                </Typography>
            </Container>
            <div className={classes.profButtons}>
                <Button color="secondary" variant="contained" style={{marginRight: '30px', justifyContent: 'center'}} onClick={goSearch}>Search</Button>
                <br />
                <br />
                <Button color="secondary" variant="contained" style={{justifyContent: 'center'}} onClick={goQueue}>Your Queue</Button>
            </div>
            <br />
            <Container maxWidth="sm">
                <Typography variant="h2" align="center" gutterBottom color="secondary">
                    Your Profile Preview
                </Typography>
            </Container>
            <DragDropContext 
                onDragEnd={onDragEnd}
            >
                    <Droppable droppableId="game">
                    {(provided) => (
                    <div ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{position: "relative"}}>
                        <Container maxWidth="md">
                            <Grid container spacing={4} justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
                                {newQueue.slice(0, 3).map((game, index) => 
                                <Draggable draggableId={String(game.game_id)} index={index} key={game.game_id}>
                                {(provided) => (
                                    <Card className={classes.profCard} {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    // justify="space-between"
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
                                            <Button onClick={(event) => sendEnd(event, game)} size="small" variant="contained" color="secondary">Move to End of Queue</Button>
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
