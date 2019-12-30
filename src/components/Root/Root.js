import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../../store";

import App from '../App';


export default function Root({ store, ...props }) {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App {...props} />
            </ConnectedRouter>
        </Provider>
    );
}