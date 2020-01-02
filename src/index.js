import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';
import {configureStore} from "./store";
import Root from './components/Root';
import { createBrowserHistory } from 'history';
import { restoreUser, saveUser, deleteStorage } from './storage/storage';

const history = createBrowserHistory();

const session = {user: restoreUser() ||  undefined } ;

const store = configureStore(session);

const rootProps = {
    history,
    store,
    session
};

store.subscribe( () => {
    const { user } = store.getState();
    if(user !== undefined) {
        saveUser(user);
    } else {
        deleteStorage();
    }
});

ReactDOM.render(<Root {...rootProps}/>, document.getElementById('root'));

