import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* editGame(action) {
    console.log(action.payload);
    try {
        yield axios.put(`/api/user_games/${action.payload}`);
        yield put({type: 'FETCH_USER_GAMES'});
    } catch (error) {
        console.log('Error with editing game')
    }
}

function* editSaga() {
    yield takeLatest('UPDATE_GAME', editGame);
}

export default editSaga;