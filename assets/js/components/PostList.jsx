import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import apiUrls from '../../constants/apiUrls';


class PostList extends React.Component {
    static propsTypes = {
        isLoading: PropTypes.bool,
        postList: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)),
    }

    static defaultProps = {
        isLoading: false,
        postList: [],
    }

    render() {
        if (this.props.isLoading) {
            return <div className='post-list'>Loading...</div>;
        }
        
        const posts = this.props.postList.map( 
                item => (<Post id={ item.id } author_id={ item.author_id } author_username={ item.author_username }
                    likes_count={ item.likes_count } text={ item.text } key={ item.id } />)
        );

        return (
            <div className='post-list'>
                { posts }
            </div>
        );
    }
}

export default PostList;
