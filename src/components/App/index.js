import { connect } from 'react-redux';

import App from "./App";
import {setUser} from "../../store/actions";

function mapDispatchToProps(dispatch) {
    return {
        loadSession: user => dispatch(setUser(user))
    };
}

export default connect(null, mapDispatchToProps)(App);