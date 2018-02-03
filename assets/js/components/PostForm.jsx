import React from 'react';
import PropTypes from 'prop-types';
import apiUrls from '../../constants/apiUrls';
import { store } from '../init';

class PostForm extends React.Component {

    state = {
        text: '',
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onClick = e => {
        e.preventDefault();
        fetch(apiUrls.postList, {
            method: 'POST',
            headers: {  Authorization: 'Token '.concat(store.getState().get('token')), 'content-type': 'application/json', 'x-csrftoken': document.cookie.match(/csrftoken=([^;]+)/)[1] },
            body: JSON.stringify(this.state),
        }).then(
            body => body.json()
        ).then(
            json => null
        );
    }

    render() {
        return (
            <div className='post-form'>
                <form method='post'>
                    <textarea className='post-form-field' rows='8' columns='200' name='text' onChange={ this.onChange } value={ this.state.text }/>
                    <div className='post-form-button'>
                        <button onClick={ this.onClick }>Create</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PostForm;
