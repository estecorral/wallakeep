import React from 'react';
import { Provider } from 'react-redux';

import App from '../App';

export default function Root({ store, ...props }) {
    return (
        <Provider store={store}>
                <App {...props} />
        </Provider>
    );
}