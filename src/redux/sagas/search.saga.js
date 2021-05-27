import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchSearch() {
    try {
        const response = yield axios.get('/api/search');
        
        yield put ({type: 'SET_SEARCH', payload: response.data});
        console.log(response.data);
    } catch {
        console.log('Error with getting search')
    }
}

function* searchSaga(){
    yield takeLatest('SEARCH_GAME', fetchSearch);
}
export default searchSaga;