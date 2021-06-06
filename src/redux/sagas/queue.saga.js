import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";


function* fetchQueue(){
    try{
        const response = yield axios.get('/api/user_games');
        yield put({type: 'SET_USER_GAMES', payload: response.data});
    } catch {
        console.log('Error with getting user games');
    }
}

function* updateQueue(action){
    try{
        yield axios.post('/api/user_games', action.payload);
        yield put({type: 'FETCH_USER_GAMES'});
    } catch {
        console.log('Error with updating user games');
    }
}

function* changeOrder(action){
    try {
        yield axios.put('/api/order', action.payload);
    } catch {
        console.log('Error with updating queue order');
    }
}

function* moveEnd(action) {
    console.log(action.payload.id)
    try {
        yield axios.put(`/api/end/${action.payload.id}`, action.payload);
        yield put({type: 'FETCH_USER_GAMES'});
    } catch {
        console.log('Error with updating queue order');
    }
}


function* queueSaga() {
    yield takeLatest('FETCH_USER_GAMES', fetchQueue);
    yield takeLatest('UPDATE_QUEUE', updateQueue);
    yield takeLatest('CHANGE_ORDER', changeOrder);
    yield takeLatest('MOVE_TO_END', moveEnd);
}

export default queueSaga;