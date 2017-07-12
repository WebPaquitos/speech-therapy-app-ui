import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitMASA, fetchMASAModel } from '../actions/index';
import { ROUTES } from '../common/constants';
import Datepicker from '../components/datepicker';

class MASAEvaluation extends Component {
    constructor(props) {
        super(props);
        this.onMASASubmitClicked = this.onMASASubmitClicked.bind(this);
        this.renderField = this.renderField.bind(this);
    }

    componentWillMount() {
        this.props.fetchMASAModel();
    }

    onMASASubmitClicked(values) {
        console.log(values);
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
                        <strong>{input.value}</strong> : {aDesc}
                    </Label>
                    <div className="text-sm-left text-danger">
                        {touched ? error : ''}
                    </div>
                </FormGroup>
            );
        } else if (type === 'date') {
            html = (
                <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
                    <Datepicker
                        dateFormat="DD/MM/YYYY"
                        placeholderText={placeholder}
                        {...input}/>
                    <div className="text-sm-left text-danger">
                        {touched ? error : ''}
                    </div>
                </div>
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
                                        <legend className="col-form-legend text-primary big-text">Patient Data</legend>
                                        <Field
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            component={this.renderField}
                                        />
                                        <Field
                                            name="birthdate"
                                            type="date"
                                            placeholder="Birthdate"
                                            component={this.renderField}
                                        />
                                        <Field
                                            name="description"
                                            type="text"
                                            placeholder="Additional data"
                                            component={this.renderField}
                                        />
                                    </FormGroup>
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
                                    <FormGroup tag="fieldset">
                                        <legend className="col-form-legend text-primary big-text">2. Cooperation</legend>
                                        <Field
                                            name="cooperation"
                                            type="radio"
                                            value="2"
                                            aDesc="Doesn't cooperate"
                                            component={this.renderField}
                                        />
                                        <Field
                                            name="cooperation"
                                            type="radio"
                                            value="5"
                                            aDesc="Reluctant"
                                            component={this.renderField}
                                        />
                                        <Field
                                            name="cooperation"
                                            type="radio"
                                            value="8"
                                            aDesc="Floating cooperation"
                                            component={this.renderField}
                                        />
                                        <Field
                                            name="cooperation"
                                            type="radio"
                                            value="10"
                                            aDesc="Cooperate"
                                            component={this.renderField}
                                        />
                                    </FormGroup>
                                    <button type="submit" className="btn btn-primary">Submit</button>
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

    if (!values.name) errors.name = 'Required field';
    if (!values.birthdate) errors.birthdate = 'Required field';
    if (!values.alertCapacity) errors.alertCapacity = 'Required field';
    if (!values.cooperation) errors.cooperation = 'Required field';

    return errors;
}

function mapStateToProps({ masa }) {
    return {
        masa,
    };
}

export default reduxForm({
    validate,
    form: 'MasaForm',
})(
    connect(mapStateToProps, { submitMASA, fetchMASAModel })(MASAEvaluation),
);
