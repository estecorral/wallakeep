import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';
import {configureStore} from "./store";
import Root from './components/Root';
import { createBrowserHistory } from 'history';
// import { restoreUser } from './storage/storage';

const history = createBrowserHistory();

// const session = restoreUser() ||  undefined;

const store = configureStore();

const rootProps = {
    history,
    store
};

ReactDOM.render(<Root {...rootProps}/>, document.getElementById('root'));
