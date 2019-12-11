import { connect } from 'react-redux';

import Create from "./Create";
import {fetchGetAddSuccess, fetchNewAdd, fetchUpdateAdd, hadleChangeAdd} from "../store/actions";
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
                await updateAd(idAdd, add).then();
            }catch (e) {
                return e;
            }
        },
        createAdd: async (newAdd) => {
            try {
                await newAd(newAdd).then();
            }catch (e) {
                return e;
            }
        },
        handleUpdateAdd: add => dispatch(hadleChangeAdd(add)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);