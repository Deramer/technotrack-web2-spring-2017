import React from 'react';
import { push } from 'react-router-redux';

import apiUrls from '../../constants/apiUrls';
import { ADD_TOKEN } from '../actions/action_types';

import { store, history } from '../init'

class Login extends React.Component {

    state = {
        username: '',
        password: '',
        nonFieldErrors: ['']
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        console.log(e);
        e.preventDefault();
        fetch(apiUrls.login, {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'x-csrftoken': document.cookie.match(/csrftoken=([^;]+)/)[1] },
            body: JSON.stringify(this.state),
        }).then(
            body => body.json()
        ).then(
            json => {
                if (json.token !== undefined) {
                    store.dispatch({ 
                        type: ADD_TOKEN,
                        payload: json.token
                    })
                    if (this.props.location.state && this.props.location.state.from) {
                        history.push(this.props.location.state.from)
                    } else {
                        push('/wall')
                    }
                } else {
                    if (json.non_field_errors) {
                        this.setState((prevState, props) => 
                                Object.assign({}, prevState, {'nonFieldErrors': json.non_field_errors})
                        );
                    }
                }
            }
        );
    };

    render () {
        return (
            <div className='form-content'>
                <h2 className='form-text-center'>Login</h2>
                <div style={{color: 'red'}}>{ 
                    this.state.nonFieldErrors.map(x => x.concat('\n')).reduce((x, y) => x.concat(y), '')
                }</div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type='text' id='username' name='username' onChange={this.onChange} value={this.state.username} />
                    <br/>
                    <input type='text' id='password' name='password' onChange={this.onChange} value={this.state.password} />
                    <br/>
                    <button type='submit' className='form-submit'>
                        Login
                    </button>
                </form>
            </div>
        )
    }
};

export default Login;
