import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'reactstrap';
import { fetchHistory } from '../actions';
import { ROUTES } from '../common/constants';

class History extends Component {
    componentWillMount() {
        this.props.fetchHistory();
    }

    renderHistory() {
        const { history } = this.props;
        return history.map((historyCase) => {
            const id = historyCase._id;
            return (
                <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>
                        <Link to={`${ROUTES.HISTORY}/${id}`}>
                            {historyCase.patient.name}
                        </Link>
                    </td>
                    <td>{historyCase.patient.description}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs="12">
                        <h1 className="push-down">History</h1>
                        <Row>
                            <Col xs="12">
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Patient name</th>
                                            <th>Patient data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderHistory()}
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

function mapStateToProps({ history }) {
    return {
        history,
    };
}

export default connect(mapStateToProps, { fetchHistory })(History);
