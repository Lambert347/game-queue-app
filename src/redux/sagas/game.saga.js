import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchGames(){
    try {
        const response = yield axios.get('/api/game');
        console.log(response.data);
        yield put({type: 'SET_GAMES', payload: response.data});
    } catch {
        console.log('Error with getting games');
    }
}

function* gameSaga() {
    yield takeLatest('FETCH_GAMES', fetchGames);

}

export default gameSaga;