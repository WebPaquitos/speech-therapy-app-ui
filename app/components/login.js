import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Jumbotron, InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import { FaUser, FaLock } from 'react-icons/lib/fa';
import { loginUser } from '../actions/index';
import { ROUTES } from '../common/constants';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onLoginClicked = this.onLoginClicked.bind(this);
        this.renderField = this.renderField.bind(this);
    }

    onLoginClicked(values) {
        this.props.loginUser(values, () => {
            this.props.history.push(ROUTES.DASHBOARD);
        });
    }

    renderField(field) {
        const { input, placeholder, icon, type, meta: { touched, error } } = field;
        return (
            <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
                <InputGroup>
                    <InputGroupAddon>
                        {icon()}
                    </InputGroupAddon>
                    <Input
                        className="form-control"
                        placeholder={placeholder}
                        type={type}
                        {...input}/>
                </InputGroup>
                <div className="text-sm-left text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="content">
                <Row>
                    <Col
                        xs={{ size: 12 }}
                        sm={{ size: 12 }}
                        md={{ size: 12 }}
                        lg={{ size: 6, push: 3 }}
                        xl={{ size: 4, push: 4 }}>
                        <Jumbotron className="small-form">
                            <form onSubmit={handleSubmit(this.onLoginClicked)}>
                                <Field
                                    name="email"
                                    placeholder="email"
                                    type="email"
                                    icon={FaUser}
                                    component={this.renderField}
                                />
                                <br/>
                                <Field
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                    icon={FaLock}
                                    component={this.renderField}
                                />
                                <br/>
                                <p className="lead d-flex justify-content-end">
                                    <button type="submit" className="btn btn-link">Login</button>
                                </p>
                            </form>
                        </Jumbotron>
                        <div className="d-flex justify-content-end">
                            <Link
                                className="btn btn-sm btn-link follow-up-btn"
                                to={ROUTES.REGISTER}>
                                No account yet? Register
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Enter an email';
    }
    if (!values.password) {
        errors.password = 'Enter a password';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'LoginForm',
})(
    connect(null, { loginUser })(Login),
);
