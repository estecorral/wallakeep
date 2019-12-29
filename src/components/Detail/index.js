import { connect } from 'react-redux';

import Detail from "./Detail";
import { fetchGetAdd } from "../../store/actions";

function mapStateToProps(state) {
    return {
        add: state.add,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAdd: (idAd) => dispatch(fetchGetAdd(idAd)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);