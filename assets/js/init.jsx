import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import Immutable from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';

// reducers
import routerReducer from './reducers/router-reducer'
import tokenReducer from './reducers/token_reducer'
import selfReducer from './reducers/self_reducer'


const initialState = Immutable.Map();

const history = createHistory();

const middleware = routerMiddleware(history);

const reds = combineReducers({
    routing: routerReducer,
    token: tokenReducer,
    self: selfReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reds, initialState, composeEnhancers(applyMiddleware(middleware)));

export {store, history};
