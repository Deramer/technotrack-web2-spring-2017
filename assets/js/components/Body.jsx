import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import apiUrls from '../../constants/apiUrls'


class Body extends React.Component {
    propsTypes = {
        page: PropTypes.oneOf(['posts', 'wall']).isRequired,
    }

    state = {
        isLoading: false,
        postList: []
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch(apiUrls.postList, {
            credentials: 'include',
        }).then(
            body => body.json()
        ).then(
            json => this.setState({
                isLoading: false,
                postList: json,
            })
        );
    }


    render() {
        return <PostList isLoading={ this.state.isLoading } postList={ this.state.postList } />;
    }
}

export default Body;
