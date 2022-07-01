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

// worker Saga: will be fired on "REMOVE_SHELF_ITEM"
function* removeShelfItem(action) {
  try {
    // Set the headers to handle JSON formatted data (not really
    // needed for a DELETE route, but good to know). Sends the
    // user credentials that allows our database to only do
    // functions tied to that specific user
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  
    // Send a axios DELETE request with the shelf item's
    // ID in the URL
    const response = yield axios.delete(`/api/shelf/${action.payload.id}`)
    console.log(":::::", response)
  }
  catch (error) {
    console.log(`Error in removeShelfItem DELETE with ${error}`)
    // Exit out of the removeShelfItem function if an error occurred
    return
  }

  // Call the dispatch function to 
  yield put({ type: "FETCH_SHELF" })

}

function* addShelfItem(action) {
    try {
        // This will add the latest item to our database
        yield axios.post('/api/shelf', action.payload);
    }
    catch (error) {
        console.log('Error in POST saga', error);
        return;
    }

    // Call the action to get our updated list from the database
    yield put({type: 'FETCH_SHELF'});
}

function* shelfSaga() {
  yield takeLatest('FETCH_SHELF', fetchShelf);
  yield takeLatest('ADD_SHELF_ITEM', addShelfItem);
  yield takeLatest('REMOVE_SHELF_ITEM', removeShelfItem)
}

export default shelfSaga;