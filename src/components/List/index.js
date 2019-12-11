import { connect } from 'react-redux';

import List from "./List";
import {fetchAddRequest, fetchAddFailure, fetchAddSuccess, fetchGetAddSuccess} from "../store/actions";
import { getAds } from "../../API/api";

function mapStateToProps(state) {
    return {
        session: state.user,
        adds: state.adds,
        ui: state.ui,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAdds: async (myTag, price, name, type) => {
            dispatch(fetchAddRequest());
            try {
                await getAds(myTag, price, name, type).then(adds => {
                    dispatch(fetchAddSuccess(adds));
                });
            } catch (e) {
                dispatch(fetchAddFailure(e));
            }
        },
        clearAdd: () => dispatch(fetchGetAddSuccess({})),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);