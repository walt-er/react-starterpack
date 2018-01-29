import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
