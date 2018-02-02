import React from 'react';
import PropTypes from 'prop-types';


class Entry extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        user_id: PropTypes.number.isRequired, 
        user_username: PropTypes.string.isRequired,
    }

    render() {
        return (<div className='post' data-id={ this.props.id }>
            <div className='entry-author' data-id={ this.props.user_id }>{ this.props.user_username }</div>
            <div className='entry-text'>{ this.props.text }</div>
        </div>);
        
    }
}

export default Entry;
