import React from 'react';
import apiUrls from '../../constants/apiUrls';
import { store } from '../init';
import PostList from './PostList';

class UserInner extends React.Component {

    state = {
        isLoadingInfo: true,
        isLoadingPosts: true,
        userInfo: {},
        postList: []
    };

    componentDidMount() {
        this.setState({isLoadingInfo: true, isLoadingPosts: true});

        fetch(apiUrls.user.concat(this.props.match.params.id, '/'), {
            headers: { Authorization: 'Token '.concat(store.getState().get('token'))}
        }).then(
            body => body.json()
        ).then(
            json => this.setState({
                isLoadingInfo: false,
                userInfo: json,
            })
        );

        fetch(apiUrls.posts.concat('?user_id=' + this.props.match.params.id), {
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

    render () {
        if (this.state.isLoadingInfo || this.state.isLoadingPosts) {
            return <p>Loading...</p>;
        }
        let arr = [];
        for (let i in this.state.userInfo) arr.push(<p key={i}>{i}: {this.state.userInfo[i]}</p>);
        return (
            <div>
                { arr }
                <h3>Posts</h3>
                <PostList isLoading={ this.state.isLoadingPosts } postList={ this.state.postList } />
            </div>
        );
    }
}

export default UserInner;
