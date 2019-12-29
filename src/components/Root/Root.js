import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from '../App';

export default function Root({ history, store, ...props }) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <App {...props} />
            </Router>
        </Provider>
    );
}