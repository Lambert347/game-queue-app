import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* removeGame(action) {
    try {
        yield axios.delete(`/api/user_games/${action.payload}`);
        yield put({type: 'FETCH_USER_GAMES'});
    } catch (error) {
        console.log('Error in Delete', error);
    }
}

function* deleteSaga() {
    yield takeLatest('REMOVE_GAME', removeGame);
}
export default deleteSaga;