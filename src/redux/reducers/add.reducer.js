import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addGame(action) {
    try {
        yield put ({type: 'CLEAR_ADD_ERROR'});
        yield axios.post('api/games', action.payload);
    } catch (error) {
        console.log('Error with adding a game to the library:', error);
        yield put ({type: 'ADD_FAILED'});
    }
}