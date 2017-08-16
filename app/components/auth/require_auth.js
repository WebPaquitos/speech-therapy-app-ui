import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.Object,
        };

        componentWillMount() {
            if (!this.props.session.isLogged) this.context.router.push('/');
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.session.isLogged) this.context.router.push('/');
        }

        render() {
            return <ComposedComponent {...this.props}/>;
        }
    }

    function mapStateToProps({ session }) {
        return {
            session,
        };
    }

    return connect(mapStateToProps)(Authentication);
}
