import { connect } from 'react-redux';

import List from "./List";
import {fetchAdds, fetchGetAddSuccess} from "../store/actions";


function mapStateToProps(state) {
    return {
        session: state.user,
        adds: state.adds,
        ui: state.ui,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAdds: (myTag, price, name, type) => dispatch(fetchAdds(myTag, price, name, type)),
        clearAdd: () => dispatch(fetchGetAddSuccess({})),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);