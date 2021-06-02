import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchDetails(action){
    console.log(action.payload)
    try {
        const response = yield axios.get(`/api/games/${action.payload}`)
        yield put({type: 'SET_DETAILS', payload: response.data});
    } catch (error) {
        console.log('Error with getting details from the server', error)
    }
}

function* detailsSaga(){
    yield takeLatest('FETCH_DETAILS', fetchDetails);
}

export default detailsSaga;