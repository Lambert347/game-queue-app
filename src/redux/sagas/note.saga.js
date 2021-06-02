import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNote(action) {
    console.log(action.payload);
    try {
        yield axios.put(`/api/note/${action.payload.id}`, action.payload);
        // yield put ({type: 'FETCH_USER_GAMES'});
    } catch (error) {
        console.log('Error with adding note')
    }
}

function* noteSaga() {
    yield takeLatest('UPDATE_NOTE', addNote);
}

export default noteSaga;