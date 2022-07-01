import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchShelf() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/shelf', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_SHELF', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* addShelfItem(action) {
    try {
        yield axios.post('/api/shelf', action.payload);
        yield put({
            type: 'ADD_SHELF_ITEM',
            payload: action.payload
        });
    }
    catch (error) {
        console.log('Error in POST saga', error);
        return;
    }
    yield put({type: 'FETCH_SHELF'});
}

function* shelfSaga() {
  yield takeLatest('FETCH_SHELF', fetchShelf);
  yield takeLatest('ADD_SHELF_ITEM', addShelfItem);
}

export default shelfSaga;