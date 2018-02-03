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
import Self from './components/Self';
import Friends from './components/Friends';
import User from './components/User';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

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
                <div>
                    <div className='header'><Header  /></div>
                    <div className='layout'>
                        <div style={{'maxWidth': 700}}>
                            <Switch>
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/logout' component={Logout} />
                                <Route exact path='/' render={() => <Redirect to='/wall' />} />
                                <PrivateRoute path='/wall' component={App} />
                                <PrivateRoute exact path='/self' component={Self} />
                                <PrivateRoute exact path='/friends' component={Friends} />
                                <PrivateRoute exact path='/user/:id' component={User} />
                            </Switch>
                        </div>
                        <div style={{position: 'absolute', right: 5, top: 10}}>
                            <Sidebar />
                        </div>
                    </div>
            </div>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'),
);
