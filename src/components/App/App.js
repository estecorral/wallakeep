import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Register from '../Register';
import List from "../List";
import Detail from "../Detail";
import Create from "../Create";
import './App.css';
import ErrorBoundary from "../../Error/ErrorBoundary"

export default class App extends React.Component{
    render() {
        return (
            <ErrorBoundary>
            <div className="App">
                <Switch>
                    <Route path='/register' exact component={Register}/>
                    <Route path='/list' exact component={List}/>
                    <Route path='/detail/:id' exact component={Detail}/>
                    <Route path='/create/:id' exact component={Create}/>
                    <Route path='/create' exact component={Create}/>
                    <Route path='/' exact component={Register}/>
                    <Route component={Register}/>
                </Switch>
            </div>
            </ErrorBoundary>
        );
    }
}