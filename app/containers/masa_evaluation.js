import Datepicker from 'react-datepicker';
import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { submitMASA, fetchMASAModel } from '../actions';
import { ROUTES } from '../common/constants';

class MASAEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: '',
                focused: false,
                touched: false,
                error: null,
            },
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
        this.renderOptions = this.renderOptions.bind(this);
        this.renderField = this.renderField.bind(this);
    }

    componentWillMount() {
        this.props.fetchMASAModel();
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.masa.fields) {
                this.props.masa.fields.forEach(({ name }) => {
                    this.setState({
                        [name]: {
                            value: null,
                            focused: false,
                            touched: false,
                            error: null,
                        },
                    });
                });
            }
        }, 500);
    }

    onMASASubmitClicked(e) {
        e.preventDefault();
        const validationResult = this.validate();
        if (validationResult === true) {
            this.props.submitMASA({
                values: this.state,
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
        e.persist();
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                touched: true,
                focused: false,
            },
        }, () => this.validate(true, e));
    }

    validateRules(temp = false, e) {
        const values = this.state;
        const ignoreFields = ['name', 'birthdate', 'description'];
        const errors = {};
        if (temp) {
            if (e.target.name === 'name' && values.name.touched && !values.name.value) errors.name = 'Field required';
            if (e.target.name === 'id' && values.id.touched && !values.id.value) errors.id = 'Field required';
        } else if (!values.name.value) errors.name = 'Field required';
        Object.keys(values).filter(k => !ignoreFields.includes(k)).forEach((key) => {
            if (temp) {
                if (e.target.name === key && values[key].touched && !values[key].value) errors[key] = 'Field required';
            } else if (!values[key].value) errors[key] = 'Field required';
        });
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

    validate(temp = false, e = null) {
        const errors = this.validateRules(temp, e);
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
                                ${this.state[field.name] && this.state[field.name].error ? 'has-danger' : ''}`}
                                key={`${field.name}${option.value}`}>
                                <Label check>
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={option.value}
                                        onChange={this.onInputChange}
                                        onFocus={this.onInputFocus}
                                        onBlur={this.onInputBlur}/>{' '}
                                    <strong>{option.value}</strong> : {option.name}
                                </Label>
                                <div className="text-sm-left text-danger">
                                    {this.state[field.name] && this.state[field.name].error ? this.state[field.name].error : ''}
                                </div>
                            </FormGroup>
                        );
                    })}
                </FormGroup>
            );
        });
    }

    renderField({ name, placeholder, type, value, error, required = false }) {
        return (
            <div className={`form-group ${required && error ? 'has-danger' : ''}`}>
                <Input
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    type={type}
                    onChange={this.onInputChange}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    value={value}/>
                <div className="text-sm-left text-danger">
                    {error || ''}
                </div>
            </div>
        );
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
                                        {this.renderField({
                                            name: 'id',
                                            placeholder: 'Patient id',
                                            type: 'text',
                                            value: this.state.id.value,
                                            error: this.state.id.error,
                                            required: true,
                                        })}
                                        {this.renderField({
                                            name: 'name',
                                            placeholder: 'Name',
                                            type: 'text',
                                            value: this.state.name.value,
                                            error: this.state.name.error,
                                            required: true,
                                        })}
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
                                        {this.renderField({
                                            name: 'description',
                                            placeholder: 'Additional data',
                                            type: 'text',
                                            value: this.state.description.value,
                                            error: this.state.description.error,
                                        })}
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
