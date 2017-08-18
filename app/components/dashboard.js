import React from 'react';
import { Row, Col } from 'reactstrap';

const Dashboard = () => {
    return (
        <div className="content text-center">
            <Row>
                <Col xs="12">
                    <h1 className="display-4 push-down">Welcome to the Speech Therapy App!</h1>
                    <h3 className="text-muted">Please choose an action from the sidebar</h3>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
