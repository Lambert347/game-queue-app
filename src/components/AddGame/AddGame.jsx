import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';

function AddGame() {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [playTime, setPlayTime] = useState('');
    const [title, setTitle] = useState('');

    const newGame = {
        game_title: title,
        play_time: playTime,
        developer: developer,
        description: description,
        publisher: publisher,
        image_url: url,
    }

    const clearFields = () => {
        setDescription('');
        setUrl('');
        setDeveloper('');
        setPublisher('');
        setPlayTime('');
        setTitle('');
    }


    const addGame = (event) => {
        event.preventDefault();

        

        dispatch({type: 'ADD_NEW_GAME', payload: newGame})
        clearFields();
    }
    return(
        <>
            <div>
                <h2>Add a game to the library:</h2>
                <p>Make sure all the fields are correct and then submit!</p>
            </div>
            <form onSubmit={addGame}>
                <input onChange={(event) => setTitle(event.target.value)} value={title} placeholder="Game Title" />
                <input onChange={(event) => setPlayTime(event.target.value)} value={playTime} placeholder="Average Play Time" />
                <input onChange={(event) => setDeveloper(event.target.value)} value={developer} placeholder="Developer" />
                <textarea onChange={(event) => setDescription(event.target.value)} value={description} placeholder="Description" />
                <input onChange={(event) => setPublisher(event.target.value)} value={publisher} placeholder="Publisher" />
                <input onChange={(event) => setUrl(event.target.value)} value={url} placeholder="Image Url" />
                <button>Submit</button>
            </form>

        </>
    )

}

