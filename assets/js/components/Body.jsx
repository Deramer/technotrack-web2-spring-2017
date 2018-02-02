import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import PostForm from './PostForm';
import Wall from './Wall';
import apiUrls from '../../constants/apiUrls'

import { store } from '../init'

class Body extends React.Component {
    propsTypes = {
        page: PropTypes.oneOf(['posts', 'wall']).isRequired,
    }

    pageToAPI = {
        posts: 'postList',
        wall: 'wall',
    }

    state = {
        isLoading: false,
        objList: []
    }

    componentDidMount() {
        this.setState({isLoading: true});

        
        fetch(apiUrls[this.pageToAPI[this.props.page]], {
            headers: { Authorization: 'Token '.concat(store.getState().get('token'))}
        }).then(
            body => body.json()
        ).then(
            json => this.setState({
                isLoading: false,
                objList: json,
            })
        );
    }

    onPostCreate = json => {
        this.setState({ objList: [json, ...this.state.objList]})
    }

    render() {
        if (this.props.page === 'posts') {
            return (
                <div className='post-container'>
                    <PostList isLoading={ this.state.isLoading } postList={ this.state.objList } />
                    <br />
                    <PostForm onPostCreate={ this.onPostCreate } />
                </div>
            )
        } else if (this.props.page === 'wall') {
            return <Wall isLoading={ this.state.isLoading } entryList={ this.state.objList } />;
        }
    }
}

export default Body;
