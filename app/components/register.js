import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Jumbotron, InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import { FaLock, FaUser } from 'react-icons/lib/fa';
import { registerUser } from '../actions/index';
import { ROUTES } from '../common/constants';

class Register extends Component {
    constructor(props) {
        super(props);
        this.onRegisterClicked = this.onRegisterClicked.bind(this);
        this.renderField = this.renderField.bind(this);
    }

    onRegisterClicked(values) {
        this.props.registerUser(values, () => {
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
                        xs={{ size: 8, push: 2 }}
                        sm={{ size: 8, push: 2 }}
                        md={{ size: 8, push: 2 }}
                        lg={{ size: 6, push: 3 }}
                        xl={{ size: 4, push: 4 }}>
                        <Jumbotron className="small-form">
                            <form onSubmit={handleSubmit(this.onRegisterClicked)}>
                                <Field
                                    name="email"
                                    placeholder="enter email"
                                    type="email"
                                    icon={FaUser}
                                    component={this.renderField}
                                />
                                <br/>
                                <Field
                                    name="password"
                                    placeholder="enter password"
                                    type="password"
                                    icon={FaLock}
                                    component={this.renderField}
                                />
                                <br/>
                                <Field
                                    name="cpassword"
                                    placeholder="confirm password"
                                    type="password"
                                    icon={FaLock}
                                    component={this.renderField}
                                />
                                <br/>
                                <p className="lead d-flex justify-content-end">
                                    <button type="submit" className="btn btn-link">Register</button>
                                </p>
                            </form>
                        </Jumbotron>
                        <div className="d-flex justify-content-end">
                            <Link
                                className="btn btn-sm btn-link follow-up-btn"
                                to={ROUTES.LOGIN}>
                                Already have an account? Login
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
    if (!values.cpassword) {
        errors.cpassword = 'Confirm your password';
    }
    if (values.password && values.cpassword) {
        if (values.password !== values.cpassword) {
            errors.password = 'Passwords don\'t match';
            errors.cpassword = 'Passwords don\'t match';
        }
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'RegisterForm',
})(
    connect(null, { registerUser })(Register),
);
