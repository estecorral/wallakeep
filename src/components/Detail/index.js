import { connect } from 'react-redux';
import { getAd } from '../../store/selectors'
import Detail from "./Detail";
import { fetchGetAdd } from "../../store/actions";

function mapStateToProps(state, ownProps) {
    return {
        add: getAd(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAdd: (idAd) => dispatch(fetchGetAdd(idAd)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);