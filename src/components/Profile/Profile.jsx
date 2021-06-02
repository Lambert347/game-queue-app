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


function Profile(){
    const queue = useSelector((store) => store.queue);
    const user = useSelector((store) => store.user);
    console.log(user);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(queue);

    const useStyles = makeStyles({
        root: {
          maxWidth: 300,
          margin: 'auto',
          overflow: 'hidden',
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
        image: {
            height: '15%',
            width: '15%',
        }
      });
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
        const games = Array.from(splicedQueue);
        const [reorderedItem] = games.splice(result.source.index, 1);
        games.splice(result.destination.index, 0, reorderedItem);
        updateNewQueue(games);
        // dispatch({type: 'CHANGE_ORDER', payload: games})
    }
    

    return (
        <>
            <h3>Profile</h3>
            <div className="buttons">
                <button onClick={goSearch}>Search for Game</button>
                <button onClick={goQueue}>Your Queue</button>
            </div>
            <br />
            <DragDropContext 
                onDragEnd={onDragEnd}
            >
                <Droppable droppableId="game">
                {(provided) => (
                <div ref={provided.innerRef}
                {...provided.droppableProps}>
                    {splicedQueue.map((game, index) => 
                    <Draggable draggableId={String(game.game_id)} index={index} key={game.game_id}>
                    {(provided) => (
                        <Card className={classes.root} {...provided.draggableProps}
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
                                <CardContent>
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
                </div>
                )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

export default Profile;
