import React from 'react';
import Body from './Body';
import Header from './Header';

class App extends React.Component {
    state = {
        page: 'wall',
    };

    render() {
        return (
            <div className='container'>
                <div className='layout'>
                    <div className='body'><Body page={ this.state.page }/></div>
                </div>
            </div>
        );
    }
}

export default App;
