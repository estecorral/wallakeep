import { connect } from 'react-redux';

import Create from "./Create";
import {fetchCreateAdd, fetchGetAdd, fetchSaveAdd} from "../../store/actions";

function mapStateToProps(state) {
    return {
        add: state.add,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAdd: (idAd) => dispatch(fetchGetAdd(idAd)),
        saveAdd: (idAdd, add) => dispatch(fetchSaveAdd(idAdd, add)),
        createAdd: (newAdd) => dispatch(fetchCreateAdd(newAdd)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);