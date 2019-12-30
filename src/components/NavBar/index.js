import { connect } from 'react-redux';

import NavBar from "./NavBar";
import {setUser, unSetSession} from "../../store/actions";

function mapStateToProps(state) {

    return {
        session: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadSession: user => dispatch(setUser(user)),
        unloadSession: () => dispatch(unSetSession({})),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);