import { connect } from 'react-redux';
import { getAds, getUi } from "../../store/selectors";
import List from "./List";
import {fetchAdds, fetchGetAddSuccess} from "../../store/actions";


function mapStateToProps(state) {
    return {
        adds: getAds(state),
        ui: getUi(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAdds: (myTag, price, name, type) => dispatch(fetchAdds(myTag, price, name, type)),
        clearAdd: () => dispatch(fetchGetAddSuccess({})),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);