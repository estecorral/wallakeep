import { connect } from 'react-redux';

import NavBar from "./NavBar";

function mapStateToProps(state) {

    return {
        session: state.user,
    };
}


export default connect(mapStateToProps, null)(NavBar);