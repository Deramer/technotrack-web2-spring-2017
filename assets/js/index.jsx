import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

// components
import App from './components/app';
import Login from './components/Login';
import Logout from './components/Logout';

// styles
import '../../static/css/style.css';

// store & history
import { store, history } from './init';



function PrivateRoute ({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => store.getState().get('token') !== ''
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}


ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/' render={() => <Link to='/wall'>AAA</Link>} />
                    <PrivateRoute path='/wall' component={App} />
                </Switch>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'),
);
