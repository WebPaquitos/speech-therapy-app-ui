import Datepicker from 'react-datepicker';
import moment from 'moment';
import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { submitMASA, fetchMASAModel, fetchPatients } from '../actions';
import { ROUTES, MASA_EVALUATION_CATEGORIES } from '../common/constants';

class MASAEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: {
                value: 0,
                dysphagiaCategory: 'Nenhuma anormalidade detectada',
                aspirationCategory: 'Nenhuma anormalidade detectada',
            },
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
            patientSelected: {
                value: {},
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
        this.manageScore = this.manageScore.bind(this);
    }

    componentWillMount() {
        this.props.fetchMASAModel();
        this.props.fetchPatients();
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
        if (e.target.name === 'patientSelected') {
            const patient = this.props.patients[e.target.value];
            this.setState({
                patientSelected: {
                    ...this.state.patientSelected,
                    value: patient || {},
                },
                id: {
                    ...this.state.id,
                    value: patient ? patient.id : '',
                    error: null,
                },
                name: {
                    ...this.state.name,
                    value: patient ? patient.name : '',
                    error: null,
                },
                birthdate: {
                    ...this.state.birthdate,
                    value: patient ? moment(patient.birthdate) : null,
                    error: null,
                },
                description: {
                    ...this.state.description,
                    value: patient ? patient.description : '',
                    error: null,
                },
            });
        } else {
            this.setState({
                [e.target.name]: {
                    ...this.state[e.target.name],
                    value: e.target.value,
                    error: (!e.target.value ? this.state[e.target.name].error : null),
                },
            }, () => this.manageScore());
        }
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

    getDysphagiaCategory(score) {
        let out = MASA_EVALUATION_CATEGORIES.NORMAL;
        if (score >= 168 && score <= 177) out = MASA_EVALUATION_CATEGORIES.LIGHT;
        else if (score >= 139 && score <= 167) out = MASA_EVALUATION_CATEGORIES.MODERATE;
        else if (score <= 138) out = MASA_EVALUATION_CATEGORIES.SEVERE;
        return out;
    }

    getAspirationCategory(score) {
        let out = MASA_EVALUATION_CATEGORIES.NORMAL;
        if (score >= 149 && score <= 169) out = MASA_EVALUATION_CATEGORIES.LIGHT;
        else if (score >= 141 && score <= 148) out = MASA_EVALUATION_CATEGORIES.MODERATE;
        else if (score <= 140) out = MASA_EVALUATION_CATEGORIES.SEVERE;
        return out;
    }

    getTotalScore() {
        const values = this.state;
        const ignoreFields = ['name', 'birthdate', 'description', 'id', 'score', 'patientSelected'];
        let score = 0;
        Object.keys(values).filter(k => !ignoreFields.includes(k)).forEach(k => score += Number(this.state[k].value));
        return score;
    }

    manageScore() {
        const newScore = this.getTotalScore();
        this.setState({
            score: {
                value: newScore,
                dysphagiaCategory: this.getDysphagiaCategory(newScore),
                aspirationCategory: this.getAspirationCategory(newScore),
            },
        });
    }

    validateRules(temp = false, e) {
        const values = this.state;
        const ignoreFields = ['name', 'birthdate', 'description', 'id'];
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
                                        onClick={this.onInputChange}
                                        // onChange={this.onInputChange}
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

    renderField({ name, placeholder = '', type, value, error, required = false, options = {}, classes = '' }) {
        let input = (
            <Input
                name={name}
                className={`form-control ${classes}`}
                placeholder={placeholder}
                type={type}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                value={value}/>
        );
        if (Object.keys(options).length) {
            input = (
                <Input
                    name={name}
                    className={`form-control ${classes}`}
                    placeholder={placeholder}
                    type={type}
                    onChange={this.onInputChange}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    value={value.id}>
                    <option value="">N/A</option>
                    {Object.keys(options).map(k => <option key={options[k].id} value={options[k].id}>{options[k].name}</option>)}
                </Input>
            );
        }
        return (
            <div className={`form-group ${required && error ? 'has-danger' : ''}`}>
                {input}
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
                                        <div>
                                            <legend className="col-form-legend text-primary big-text">Test Score</legend>
                                            <p>Score: <strong>{this.state.score.value}</strong></p>
                                            <p>Dysphagia Category: <strong>{this.state.score.dysphagiaCategory}</strong>
                                                | Aspiration Category: <strong>{this.state.score.aspirationCategory}</strong></p>
                                        </div>
                                    </FormGroup>
                                    <FormGroup tag="fieldset">
                                        <legend className="col-form-legend text-primary big-text">Patient Data</legend>
                                        {this.renderField({
                                            name: 'patientSelected',
                                            type: 'select',
                                            classes: 'col-xl-6',
                                            value: this.state.patientSelected.value,
                                            error: this.state.patientSelected.error,
                                            options: this.props.patients,
                                        })}
                                        {this.renderField({
                                            name: 'id',
                                            placeholder: 'Patient id',
                                            type: 'text',
                                            classes: 'col-xl-6',
                                            value: this.state.id.value,
                                            error: this.state.id.error,
                                            required: true,
                                        })}
                                        {this.renderField({
                                            name: 'name',
                                            placeholder: 'Name',
                                            type: 'text',
                                            classes: 'col-xl-6',
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
                                            classes: 'col-xl-6',
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

function mapStateToProps({ masa, patients }) {
    return {
        masa,
        patients,
    };
}


export default connect(mapStateToProps, { submitMASA, fetchMASAModel, fetchPatients })(MASAEvaluation);
