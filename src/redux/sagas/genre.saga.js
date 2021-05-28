import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchGenres(){
    try {
        const response = yield axios.get('/api/genres');
        console.log(response.data);
        yield put({type: 'SET_GENRE', payload: response.data})
    } catch {
        console.log('Error with getting genres');
    }
}

function* genreSaga() {
    yield takeLatest('FETCH_GENRE', fetchGenres);
}

export default genreSaga;