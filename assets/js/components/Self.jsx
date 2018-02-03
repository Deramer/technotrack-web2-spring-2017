import React from 'react';
import Header from './Header';
import { store } from '../init';
import { DEFINE_SELF } from '../actions/action_types'
import apiUrls from '../../constants/apiUrls';
import PostForm from './PostForm'
import PostList from './PostList';

class Self extends React.Component {

    state = {isLoading: true}

    componentDidMount() {
        this.setState({isLoadingInfo: true, isLoadingPosts: true});

        fetch(apiUrls.self, {
            headers: { Authorization: 'Token '.concat(store.getState().get('token'))}
        }).then(
            body => body.json()
        ).then(
            json => {
                this.setState({
                    isLoadingInfo: false,
                    selfInfo: json,
                });
                store.dispatch({type: DEFINE_SELF, payload: json});
                fetch(apiUrls.posts.concat('?user_id=' + json.id), {
                    headers: { Authorization: 'Token '.concat(store.getState().get('token'))}
                }).then(
                    body => body.json()
                ).then(
                    json => this.setState({
                        isLoadingPosts: false,
                        postList: json,
                    })
                );
            }
        );

    }

    onPostCreate = json => {
        this.setState(Object.assign({}, this.state, { postList: [json, ...this.state.postList] }))
    }

    render () {
        if (this.state.isLoadingInfo || this.state.isLoadingPosts) {
            return <p>Loading...</p>;
        }
        let arr = [];
        for (let i in this.state.selfInfo) arr.push(<p key={i}>{i}: {this.state.selfInfo[i]}</p>);
        return (
                <div className='container'>
                    <div>{ arr }</div>
                    <p>Create post:</p>
                    <PostForm onPostCreate={ this.onPostCreate }/>
                    <h3>My posts</h3>
                    <PostList isLoading={ this.state.isLoadingPosts } postList={ this.state.postList } />
                </div>
        );
    }
}

export default Self;
