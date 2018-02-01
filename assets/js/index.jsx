import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import Immutable from 'immutable';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import routerReducer from './reducers/router-reducer'

import '../../static/css/style.css';

const initialState = Immutable.Map();

const reds = combineReducers({
    routing: routerReducer
});

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(reds, initialState, applyMiddleware(middleware));

ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path='/' render={() => <Link to='/wall'>AAA</Link>} />
                    <Route path='/wall' component={App} />
                </Switch>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'),
);
