import React from 'react';
import { store } from '../init';
import apiUrls from '../../constants/apiUrls';
import Centrifuge from 'centrifuge';

class Sidebar extends React.Component {

    state = {posts: []}

    listener() {
        if (store.getState().get('token') !== '') {
            this.state.unsubscribe();

            fetch(apiUrls.centrifugo, {
                headers: { Authorization: 'Token '.concat(store.getState().get('token'))}
            }).then(
                body => body.json()
            ).then(this.startCentrifuge.bind(this));
        }
    }

    startCentrifuge(params) {
        let centrifuge = new Centrifuge({
            url: 'http://web2.lvh.me:8000',
            user: params.user,
            token: params.token,
            timestamp: params.timestamp
        });
        centrifuge.subscribe('posts', this.centrifugeListener.bind(this));
        centrifuge.connect();
    }

    centrifugeListener(message) {
        console.log(message);
    }

    componentDidMount() {
        this.state.unsubscribe = store.subscribe(this.listener.bind(this))
    }

    render() {
        return <div>mmmmm</div>;
    };
}

export default Sidebar;
