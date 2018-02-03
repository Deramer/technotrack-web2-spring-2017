import React from 'react';
import { Link } from 'react-router-dom';
import { store } from '../init'

class Header extends React.Component {
    render() {
        return (<ul className='header-list'>
            <li><Link to='/self'>My page</Link></li>
            <li><Link to='/wall'>Wall</Link></li>
            <li><Link to='/friends'>Friends</Link></li>
            <li className='header-user'><Link to='/self'>{ store.getState().getIn(['self', 'username']) }</Link></li>
        </ul>);
    }
}

export default Header;
