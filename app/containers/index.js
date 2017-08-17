import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ROUTES } from '../common/constants';

class Index extends Component {
    componentWillMount() {
        if (this.props.session.isLogged) {
            this.props.history.push(ROUTES.DASHBOARD);
        } else {
            this.props.history.push(ROUTES.LOGIN);
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.session.isLogged) {
            this.props.history.push(ROUTES.DASHBOARD);
        } else {
            this.props.history.push(ROUTES.LOGIN);
        }
    }

    render() {
        return null;
    }
}

function mapStateToProps({ session }) {
    return {
        session,
    };
}

export default connect(mapStateToProps)(Index);
