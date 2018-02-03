import React from 'react';
import apiUrls from '../../constants/apiUrls';
import { store } from '../init';

class UserInner extends React.Component {

    state = {
        isLoading: true,
        userInfo: {}
    };

    componentDidMount() {
        console.log(this.props)
        this.setState({isLoading: true});

        fetch(apiUrls.user.concat(this.props.match.params.id, '/'), {
            headers: { Authorization: 'Token '.concat(store.getState().get('token'))}
        }).then(
            body => body.json()
        ).then(
            json => this.setState({
                isLoading: false,
                userInfo: json,
            })
        );
    }

    render () {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        let arr = [];
        for (let i in this.state.userInfo) arr.push(<p key={i}>{i}: {this.state.userInfo[i]}</p>);
        return <div>{ arr }</div>;
    }
}

export default UserInner;
