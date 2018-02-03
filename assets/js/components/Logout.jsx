import React from 'react';
import { Redirect } from 'react-router';
import { store } from '../init';
import { DELETE_TOKEN } from '../actions/action_types';

class Logout extends React.Component {

    render () {
        store.dispatch({
            type: DELETE_TOKEN
        });
        return <Redirect to='/'/>;
    }
};

export default Logout;
