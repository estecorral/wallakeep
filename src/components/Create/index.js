import { connect } from 'react-redux';

import Create from "./Create";
import {fetchGetAddSuccess, fetchNewAdd, fetchUpdateAdd} from "../../store/actions";
import { getOneAd, newAd, updateAd } from "../../API/api";

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
        saveAdd: async (idAdd, add) => {
            try {
                await updateAd(idAdd, add).then(dispatch(fetchUpdateAdd()));
            }catch (e) {
                return e;
            }
        },
        createAdd: async (newAdd) => {
            try {
                await newAd(newAdd).then(dispatch(fetchNewAdd()));
            }catch (e) {
                return e;
            }
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);