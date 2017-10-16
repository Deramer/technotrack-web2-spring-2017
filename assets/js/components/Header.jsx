import React from 'react';


class Header extends React.Component {
    render() {
        return (<ul className='header-list'>
            <li>My page</li>
            <li>Wall</li>
            <li>Posts</li>
            <li>Friends</li>
            <li className='header-user'>Username</li>
        </ul>);
    }
}

export default Header;
