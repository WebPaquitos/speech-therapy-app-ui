import { FaEye } from 'react-icons/lib/fa';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'reactstrap';
import { fetchHistory } from '../actions';
import { formatDate } from '../common/utils';
import { ROUTES } from '../common/constants';

class History extends Component {
    componentWillMount() {
        this.props.fetchHistory();
    }

    renderHistory() {
        const { history } = this.props;
        return Object.keys(history).map((key) => {
            const { _id, created, patient: { name }, score, scoreLabelAspiracao, scoreLabelDisfagia } = history[key];
            return (
                <tr key={_id}>
                    <td>{formatDate(new Date(created))}</td>
                    <td>{name}</td>
                    <td>{score}</td>
                    <td>{scoreLabelAspiracao}</td>
                    <td>{scoreLabelDisfagia}</td>
                    <td>
                        <Link to={`${ROUTES.HISTORY}/${_id}`}>{FaEye()}</Link>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs="12">
                        <h1 className="push-down">Evaluation History</h1>
                        <Row>
                            <Col xs="12">
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Evaluation date</th>
                                            <th>Patient name</th>
                                            <th>Score</th>
                                            <th>Dysphagia Category</th>
                                            <th>Aspiration Category</th>
                                            <th/>
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
