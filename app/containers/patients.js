import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'reactstrap';
import { FaEye } from 'react-icons/lib/fa';
import { fetchPatients } from '../actions';
import { ROUTES } from '../common/constants';

class Patients extends Component {
    componentWillMount() {
        this.props.fetchPatients();
    }

    renderPatients() {
        const { patients } = this.props;
        return Object.keys(patients).map((key) => {
            const patient = patients[key];
            return (
                <tr key={patient.name}>
                    <td>{patient.name}</td>
                    <td>{patient.description}</td>
                    <td><Link to={`${ROUTES.PATIENTS}/${patient.id}`}>{FaEye()}</Link></td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs="12">
                        <h1 className="push-down">Patients</h1>
                        <Row>
                            <Col xs="12">
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Patient name</th>
                                            <th>Patient data</th>
                                            <th/>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPatients()}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps({ patients }) {
    return {
        patients,
    };
}

export default connect(mapStateToProps, { fetchPatients })(Patients);
