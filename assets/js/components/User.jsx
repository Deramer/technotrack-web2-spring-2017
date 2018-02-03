import React from 'react';
import Header from './Header';
import UserInner from './UserInner';

class User extends React.Component {

    render () {
        console.log(this.props.match)
        return (
            <div className='container'>
                <div className='header'><Header  /></div>
                <UserInner match={ this.props.match } />
            </div>
        );
    };
}

export default User;
