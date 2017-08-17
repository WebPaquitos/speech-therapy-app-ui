import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ROUTES } from '../../common/constants';

export default function (ComponentToCompose) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.session.isLogged) this.props.history.push(ROUTES.LOGIN);
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.session.isLogged) nextProps.history.push(ROUTES.LOGIN);
        }

        render() {
            return <ComponentToCompose {...this.props}/>;
        }
    }

    function mapStateToProps({ session }) {
        return {
            session,
        };
    }

    return connect(mapStateToProps)(Authentication);
}
