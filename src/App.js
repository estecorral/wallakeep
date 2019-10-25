import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './components/Register/Register';
import List from "./components/List/List";
import Detail from "./components/Detail/Detail";
import './App.css';
import UserContext from "./context/user";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.state = {
            user: {},
            updateUser: this.updateUser,
        }
    }

    updateUser = (user) => {
        this.setState({ user });
    };
    render() {
        return (
            <div className="App">
                <UserContext.Provider value = {this.state}>
                    <Router>
                        <Switch>
                            <Route path='/register' component={Register}>
                                <Register reg={this.register}/>
                            </Route>
                            <Route path='/list' component={List}/>
                            <Route path='/list/:tag' component={List}>
                                <List/>
                            </Route>
                            <Route path='/detail/:id' component={Detail}/>
                            <Route path='/' component={Register}/>
                            <Route component={Register}/>
                        </Switch>
                    </Router>
                </UserContext.Provider>
            </div>
        );
    }
}