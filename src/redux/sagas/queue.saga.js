import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchQueue(){
    try{
        const response = yield axios.get('/api/user_games');
        console.log(response.data);
        yield put({type: 'SET_USER_GAMES', payload: response.data});
    } catch {
        console.log('Error with getting user games');
    }
}

function* queueSaga() {
    yield takeLatest('FETCH_USER_GAMES', fetchQueue);
}

export default queueSaga;