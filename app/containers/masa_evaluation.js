import Datepicker from 'react-datepicker';
import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { submitMASA, fetchMASAModel } from '../actions/index';
import { ROUTES } from '../common/constants';

class MASAEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                focused: false,
                touched: false,
                error: null,
            },
            birthdate: {
                value: null,
                focused: false,
                touched: false,
                error: null,
            },
            description: {
                value: '',
                focused: false,
                touched: false,
                error: null,
            },
        };
        this.onMASASubmitClicked = this.onMASASubmitClicked.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.validateRules = this.validateRules.bind(this);
        this.showErrors = this.showErrors.bind(this);
        this.validate = this.validate.bind(this);
        this.tempValidate = this.tempValidate.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
    }

    componentWillMount() {
        this.props.fetchMASAModel();
    }

    onMASASubmitClicked(e) {
        e.preventDefault();
        console.log(this.state);
        const validationResult = this.validate();
        if (validationResult === true) {
            this.props.submitMASA({
                values: {},
                masaModel: this.props.masa,
            }, () => {
                this.props.history.push(ROUTES.NEW_EVALUATION);
            });
        } else this.showErrors(validationResult);
    }

    onDateChange(date) {
        this.setState({
            birthdate: {
                ...this.state.birthdate,
                value: (!date ? null : date),
            },
        });
    }

    onInputChange(e) {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
                error: (!e.target.value ? this.state[e.target.name].error : null),
            },
        });
    }

    onInputFocus(e) {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                focused: true,
            },
        });
    }

    onInputBlur(e) {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                touched: true,
                focused: false,
            },
        }, () => this.validate(true));
    }

    validateRules(temp = false) {
        const values = this.state;
        const errors = {};
        if (temp) {
            if (values.name.touched && !values.name.value) errors.name = 'Field required';
        } else if (!values.name.value) errors.name = 'Field required';
        return errors;
    }

    showErrors(errors) {
        Object.keys(errors).forEach((key) => {
            this.setState({
                [key]: {
                    ...this.state[key],
                    error: errors[key],
                },
            });
        });
    }

    validate(temp = false) {
        const errors = this.validateRules(temp);
        if (Object.keys(errors).length === 0) return true;
        return (temp ? this.showErrors(errors) : errors);
    }

    renderOptions() {
        if (this.props.masa === {} || this.props.masa.fields === undefined) return null;
        return this.props.masa.fields.map((field, index) => {
            return (
                <FormGroup tag="fieldset" key={field.name}>
                    <legend className="col-form-legend text-primary big-text">{Number(index) + 1}. {field.label}</legend>
                    {field.options.map((option) => {
                        return (
                            <FormGroup
                                check
                                className={`form-check-inline
                                ${this.state[field.name] && this.state[field.name].touched && this.state[field.name].error ? 'has-danger' : ''}`}
                                key={`${field.name}${option.value}`}>
                                <Label check>
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={option.value}
                                        onChange={this.onInputChange}/>{' '}
                                    <strong>{option.value}</strong> : {option.name}
                                </Label>
                                <div className="text-sm-left text-danger">
                                    {' '}
                                </div>
                            </FormGroup>
                        );
                    })}
                </FormGroup>
            );
        });
    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col>
                        <h1 className="push-down">MASA Test</h1>
                        <Row>
                            <form className="form-full" onSubmit={this.onMASASubmitClicked}>
                                <Col>
                                    <FormGroup tag="fieldset">
                                        <legend className="col-form-legend text-primary big-text">Patient Data</legend>
                                        <div className={`form-group ${this.state.name.touched && this.state.name.error ? 'has-danger' : ''}`}>
                                            <Input
                                                name="name"
                                                className="form-control"
                                                placeholder="Name"
                                                type="text"
                                                onChange={this.onInputChange}
                                                onFocus={this.onInputFocus}
                                                onBlur={this.onInputBlur}
                                                value={this.state.name.value}/>
                                            <div className="text-sm-left text-danger">
                                                {this.state.name.error ? this.state.name.error : ''}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Datepicker
                                                selected={this.state.birthdate.value}
                                                value={this.state.birthdate.value}
                                                onChange={this.onDateChange}
                                                onFocus={this.onInputFocus}
                                                onBlur={this.onInputBlur}
                                                className="date-picker"
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                name="birthdate"
                                                dateFormat="DD/MM/YYYY"
                                                placeholderText="Birthdate"
                                                isClearable
                                            />
                                            <div className="text-sm-left text-danger">
                                                {this.state.birthdate.error ? this.state.birthdate.error : ''}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                name="description"
                                                className="form-control"
                                                placeholder="Additional data"
                                                type="text"
                                                onChange={this.onInputChange}
                                                onFocus={this.onInputFocus}
                                                onBlur={this.onInputBlur}
                                                value={this.state.description.value}/>
                                            <div className="text-sm-left text-danger">
                                                {this.state.description.error ? this.state.description.error : ''}
                                            </div>
                                        </div>
                                    </FormGroup>
                                    {this.renderOptions()}
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

function mapStateToProps({ masa }) {
    return {
        masa,
    };
}


export default connect(mapStateToProps, { submitMASA, fetchMASAModel })(MASAEvaluation);
