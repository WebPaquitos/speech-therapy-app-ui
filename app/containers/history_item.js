import { Col, ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from '../components/content';
import { formatDate } from '../common/utils';
import { fetchHistoryItem } from '../actions';

class HistoryItem extends Component {
    componentWillMount() {
        this.props.fetchHistoryItem(this.props.match.params.id);
    }

    render() {
        const { masa } = this.props;
        if (!masa) return <div>Loading...</div>;
        return (
            <Content title={`History Case #${masa._id}`}>
                <Col xs={12} className="push-down">
                    <h3 className="text-primary"><strong>{masa.patient.id}</strong> - {masa.patient.name}</h3>
                    <p>Dysphagia Category: <strong>{masa.scoreLabelDisfagia}</strong>
                        | Aspiration Category: <strong>{masa.scoreLabelAspiracao}</strong></p>
                    <small className="text-muted">
                        {formatDate(new Date(masa.patient.birthdate))}
                    </small>
                    <p className="lead">Additional data: {masa.patient.description}</p>
                </Col>
                <Col xs={12} className="push-down">
                    <ListGroup>
                        <ListGroupItem active>
                            <ListGroupItemHeading>Test results <strong>(Score: {masa.score})</strong></ListGroupItemHeading>
                        </ListGroupItem>
                        {masa.fields.map((field) => {
                            return (
                                <ListGroupItem key={field.name}>
                                    <ListGroupItemHeading>{field.label}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                        <strong>{field.chosen}</strong>
                                        - {field.options.find(({ value }) => value === field.chosen).name}
                                    </ListGroupItemText>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </Col>
            </Content>
        );
    }
}

function mapStateToProps({ history }, ownProps) {
    return {
        masa: history[ownProps.match.params.id],
    };
}

export default connect(mapStateToProps, { fetchHistoryItem })(HistoryItem);
