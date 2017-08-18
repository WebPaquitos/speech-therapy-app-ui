import { Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHistoryItem } from '../actions';

class HistoryItem extends Component {
    componentWillMount() {
        this.props.fetchHistoryItem(this.props.match.params.id);
    }

    render() {
        const { masa } = this.props;
        if (!masa) return <div>Loading...</div>;
        return (
            <div className="content">
                <Row>
                    <Col xs="12">
                        <h1 className="push-down">History Case #{masa._id}</h1>
                        <Row>
                            <Col xs="12">
                                {masa.patient.name}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps({ history }, ownProps) {
    return {
        masa: history.find(m => m._id === ownProps.match.params.id),
    };
}

export default connect(mapStateToProps, { fetchHistoryItem })(HistoryItem);
