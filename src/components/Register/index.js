import { connect } from 'react-redux';

import Register from "./Register";
import {setSession} from "../../store/actions";

function mapDispatchToProps(dispatch, ownProps) {
    return {
        loadSession: user => dispatch(setSession(user), ownProps.push),
    };
}

export default connect(null, mapDispatchToProps)(Register);