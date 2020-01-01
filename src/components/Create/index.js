import { connect } from 'react-redux';

import Create from "./Create";
import {fetchCreateAdd, fetchSaveAdd} from "../../store/actions";
import {getAd} from "../../store/selectors";

function mapStateToProps(state) {
    return {
        add: getAd(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveAdd: (idAdd, add) => dispatch(fetchSaveAdd(idAdd, add)),
        createAdd: (newAdd) => dispatch(fetchCreateAdd(newAdd)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);