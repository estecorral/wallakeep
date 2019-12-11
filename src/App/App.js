import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from '../components/Register';
import List from "../components/List";
import Detail from "../components/Detail";
import Create from "../components/Create";
import './App.css';
import UserContext from "../context/user";
import ErrorBoundary from "../Error/ErrorBoundary"
import {setUser} from "../components/store/actions";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.state = {
            user: {},
            updateUser: this.updateUser,
        }
    }

    componentDidMount() {

    }

    updateUser = (user) => {
        this.setState({ user });
       this.props.loadSession(setUser(user));
    };
    render() {
        return (
            <ErrorBoundary>
            <div className="App">
                <UserContext.Provider value = {this.state}>
                    <Router>
                        <Switch>
                            <Route path='/register' component={Register}/>
                            <Route path='/list' component={List}/>
                            <Route path='/detail/:id' component={Detail}/>
                            <Route path='/create/:id' component={Create}/>
                            <Route path='/create' component={Create}/>
                            <Route path='/' component={Register}/>
                            <Route component={Register}/>
                        </Switch>
                    </Router>
                </UserContext.Provider>
            </div>
            </ErrorBoundary>
        );
    }
}