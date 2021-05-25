import { useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import ReactDom from 'react-dom';
import {useDispatch, useSelector, } from 'react-redux'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function Profile(){
    const queue = useSelector((store) => store.games);
    const dispatch = useDispatch();
    console.log(queue);

    return (
        <>
        <h3>Profile</h3>
        <div className="buttons">
            <button>Search for Game</button>
            <button>Your Queue</button>
        </div>
        <div className="preview">
            <div className="game1">
                sample text
            </div>
            <div className="game2">
                sample text
            </div>
            <div className="game3">
                sample text
            </div>
        </div>
        </>
        
    )
}

export default Profile;
