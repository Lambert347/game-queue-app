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

function* updateQueue(action){
    console.log(action.payload);
    try{
        yield axios.post('/api/user_games', action.payload);
        yield put({type: 'FETCH_USER_GAMES'});
    } catch {
        console.log('Error with updating user games');
    }
}

function* changeOrder(action){
    console.log(action.payload)
    try {
        yield axios.put('/api/user_games', action.payload);
        yield put({type: 'FETCH_USER_GAMES'});
    } catch {
        console.log('Error with updating queue order');
    }
}


function* queueSaga() {
    yield takeLatest('FETCH_USER_GAMES', fetchQueue);
    yield takeLatest('UPDATE_QUEUE', updateQueue);
    yield takeLatest('CHANGE_ORDER', changeOrder);
}

export default queueSaga;