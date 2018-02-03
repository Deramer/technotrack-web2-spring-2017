import React from 'react';
import Header from './Header';

class Friends extends React.Component {
    render () {
        return (
            <div className='container'>
                <div className='header'><Header /></div>
                <h1>Friends</h1>
            </div>
        );
    }
}

export default Friends;
