import { connect } from 'react-redux';

import Detail from "./Detail";
import {fetchGetAddSuccess} from "../../store/actions";
import { getOneAd } from "../../API/api";

function mapStateToProps(state) {
    return {
        add: state.add,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAdd: async (idAd) => {
            try {
               await getOneAd(idAd).then(add => {
                   dispatch(fetchGetAddSuccess(add));
                });

            } catch (e) {
               return e;
            }
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);