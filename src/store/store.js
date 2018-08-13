/* ------------------------------------------- */
/*   Redux Data Store (only 1 per Redux app)
/* ------------------------------------------- */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer-root';

const store = createStore(
    rootReducer,
	applyMiddleware(thunk)
)

export default store;
