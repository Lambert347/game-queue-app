import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

function AddGame() {
    const dispatch = useDispatch();
    const errors = useSelector((store) => store.errors);


    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [playTime, setPlayTime] = useState('');
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');

    const newGame = {
        game_title: title,
        play_time: playTime,
        developer: developer,
        description: description,
        publisher: publisher,
        image_url: url,
        platform: platform,
    }

    const clearFields = () => {
        setDescription('');
        setUrl('');
        setDeveloper('');
        setPublisher('');
        setPlayTime('');
        setTitle('');
        setPlatform('');
    }


    const addGame = (event) => {
        event.preventDefault();
        dispatch({type: 'ADD_NEW_GAME', payload: newGame})
        clearFields();
    }
    return (
        <>
            <div>
                <h2>Add a game to the library:</h2>
                <p>Make sure all the fields are correct and then submit!</p>
                {errors.addMessage && (
                    <h3 className="alert" role="alert">
                        {errors.addMessage}
                    </h3>
                )}
            </div>
            <form onSubmit={addGame}>
                <input onChange={(event) => setTitle(event.target.value)} value={title} placeholder="Game Title" required/>
                <input onChange={(event) => setPlayTime(event.target.value)} value={playTime} placeholder="Average Play Time" required/>
                <input onChange={(event) => setDeveloper(event.target.value)} value={developer} placeholder="Developer" required />
                <textarea onChange={(event) => setDescription(event.target.value)} value={description} placeholder="Description" required />
                <input onChange={(event) => setPublisher(event.target.value)} value={publisher} placeholder="Publisher" required />
                <input onChange={(event) => setUrl(event.target.value)} value={url} placeholder="Image Url" required/>
                <input onChange={(event) => setPlatform(event.target.value)} value={platform} placeholder="Platform" required/>
                <button>Submit</button>
            </form>
        </>
    );
}

export default AddGame;

