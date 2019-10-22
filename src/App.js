import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './components/Register/Register';
import List from "./components/List/List";
import './App.css';
import UserContext from "./context/user";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    render() {
        return (
            <div className="App">
                <UserContext.Provider value={this.state}>
                    <Router>
                        <Switch>
                            <Route path='/register' component={Register}/>
                            <Route path='/list' component={List}/>
                            <Route component={Register}/>
                        </Switch>
                    </Router>
                </UserContext.Provider>
            </div>
        );
    }
}
