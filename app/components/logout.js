import { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';
import { ROUTES } from '../common/constants';

class Logout extends Component {
    componentDidMount() {
        this.props.logoutUser();
        this.props.history.push(ROUTES.LOGIN);
    }

    render() {
        return null;
    }
}

export default connect(null, { logoutUser })(Logout);
