import React from 'react';
import Body from './Body';
import Header from './Header';

class App extends React.Component {
    state = {
        page: 'posts',
    };

    render() {
        return (
            <div className='container'>
                <div className='header'><Header /></div>
                <div className='layout'>
                    <div className='body'><Body page={ this.state.page }/></div>
                </div>
            </div>
        );
    }
}

export default App;
