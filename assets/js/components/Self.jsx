import React from 'react';
import Header from './Header';
import { store } from '../init';
import { DEFINE_SELF } from '../actions/action_types'
import apiUrls from '../../constants/apiUrls';
import PostForm from './PostForm'

class Self extends React.Component {

    state = {isLoading: true}

    componentDidMount() {
        this.setState({isLoading: true});

        fetch(apiUrls.self, {
            headers: { Authorization: 'Token '.concat(store.getState().get('token'))}
        }).then(
            body => body.json()
        ).then(
            json => {
                this.setState({
                    isLoading: false,
                    selfInfo: json,
                });
                store.dispatch({type: DEFINE_SELF, payload: json});
            }
        );
    }

    render () {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        let arr = [];
        for (let i in this.state.selfInfo) arr.push(<p key={i}>{i}: {this.state.selfInfo[i]}</p>);
        return (
                <div className='container'>
                    <div className='header'><Header /></div>
                    <div>{ arr }</div>
                    <p>Create post:</p>
                    <PostForm />
                </div>
        );
    }
}

export default Self;
