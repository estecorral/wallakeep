import { connect } from 'react-redux';

import Register from "./Register";
import {setUser} from "../../store/actions";

function mapStateToProps(state) {
    return {
        session: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadSession: user => dispatch(setUser(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);