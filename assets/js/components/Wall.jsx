import React from 'react'
import Entry from './Entry'
import PropTypes from 'prop-types';

class Wall extends React.Component {

    static propsTypes = {
        isLoading: PropTypes.bool,
        entryList: PropTypes.arrayOf(PropTypes.shape(Entry.propTypes)),
    }

    static defaultProps = {
        isLoading: false,
        postList: [],
    }

    render() {
        if (this.props.isLoading) {
            return <div className='entry-list'>Loading...</div>;
        }
        
        const entries = this.props.entryList.map( 
                item => (<Entry id={ item.id } user_id={ item.user_id } user_username={ item.user_username }
                    text={ item.text } key={ item.id } />)
        );

        return (
            <div className='entry-list'>
                { entries }
            </div>
        );
    }
}

export default Wall;
