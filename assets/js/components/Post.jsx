import React from 'react';
import PropTypes from 'prop-types';


class Post extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        author_id: PropTypes.number.isRequired, 
        author_username: PropTypes.string.isRequired,
        likes_count: PropTypes.number.isRequired,
    }

    render() {
        return (<div className='post' data-id={ this.props.id }>
            <div className='post-author' data-id={ this.props.author_id }>{ this.props.author_username }</div>
            <div className='post-text'>{ this.props.text }</div>
        </div>);
        
    }
}

export default Post
