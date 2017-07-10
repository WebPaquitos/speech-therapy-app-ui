import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
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
        const { input, placeholder, type, aDesc, meta: { touched, error } } = field;
        let html = null;
        if (type === 'radio') {
            html = (
                <FormGroup check className={`${touched && error ? 'has-danger' : ''} form-check-inline`}>
                    <Label check>
                        <Input
                            type={type}
                            {...input} />{' '}
                        {`${input.value} : ${aDesc}`}
                    </Label>
                    <div className="text-sm-left text-danger">
                        {touched ? error : ''}
                    </div>
                </FormGroup>
            );
        } else {
            html = (
                <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
                    <Input
                        className="form-control"
                        placeholder={placeholder}
                        type={type}
                        {...input}/>
                    <div className="text-sm-left text-danger">
                        {touched ? error : ''}
                    </div>
                </div>
            );
        }
        return html;
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="content">
                <Row>
                    <Col>
                        <h1 className="push-down">MASA Test</h1>
                        <Row>
                            <form className="form-full" onSubmit={handleSubmit(this.onMASASubmitClicked)}>
                                <Col>
                                    <FormGroup tag="fieldset">
                                        <legend className="col-form-legend text-primary big-text">1. Alert Capacity</legend>
                                        <Field
                                            name="alertCapacity"
                                            type="radio"
                                            value="2"
                                            aDesc="No response to speech"
                                            component={this.renderField}
                                        />
                                        <Field
                                            name="alertCapacity"
                                            type="radio"
                                            value="5"
                                            aDesc="Difficulty waking"
                                            component={this.renderField}
                                        />
                                        <Field
                                            name="alertCapacity"
                                            type="radio"
                                            value="8"
                                            aDesc="Sleepy"
                                            component={this.renderField}
                                        />
                                        <Field
                                            name="alertCapacity"
                                            type="radio"
                                            value="10"
                                            aDesc="Alert"
                                            component={this.renderField}
                                        />
                                    </FormGroup>
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

    if (!values.alertCapacity) errors.alertCapacity = 'Value required';

    return errors;
}

export default reduxForm({
    validate,
    form: 'MasaForm',
})(
    connect(null, { submitMASA })(MASAEvaluation),
);
