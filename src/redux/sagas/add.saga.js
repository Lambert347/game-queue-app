import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* addGame(action){
    try {
        console.log(action.payload);
        yield axios.post('/api/games', action.payload);
        yield put({type: 'GET_GAMES'});
    } catch(error){
        console.log('Error with adding a game', error);
    }
}

function* addGameSaga(){
    yield takeLatest('ADD_NEW_GAME', addGame);
}

export default addGameSaga;