import React, { Component } from 'react';
import { Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitMASA } from '../actions/index';
import { ROUTES } from '../common/constants';

class MASAEvaluation extends Component {
    constructor(props) {
        super(props);
        this.onMASASubmitClicked = this.onMASASubmitClicked.bind(this);
        this.renderField = this.renderField.bind(this);
    }

    onMASASubmitClicked(values) {
        this.props.submitMASA(values, () => {
            this.props.history.push(ROUTES.NEW_EVALUATION);
        });
    }

    renderField(field) {
        const { input, placeholder, icon, type, meta: { touched, error } } = field;
        return (
            <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
                <InputGroup>
                    <InputGroupAddon>
                        {/*{icon()}*/}
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
                    <Col xs="12">
                        <h1 className="push-down">MASA Test</h1>
                        <Row>
                            <form onSubmit={handleSubmit(this.onMASASubmitClicked)}>
                                <Col xs="12">
                                    <Field
                                        name="email"
                                        placeholder="email"
                                        type="email"
                                        component={this.renderField}
                                    />
                                </Col>
                            </form>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    console.log(values);

    return errors;
}

export default reduxForm({
    validate,
    form: 'MasaForm',
})(
    connect(null, { submitMASA })(MASAEvaluation),
);
