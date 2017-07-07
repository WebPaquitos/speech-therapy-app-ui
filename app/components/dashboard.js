import React from 'react';
import { Row, Col } from 'reactstrap';

const Dashboard = () => {
    return (
        <div className="content text-center">
            <Row>
                <Col xs="12">
                    <h1>
                        Welcome to the Speech Therapy App!
                        <br/><br/>
                        <small className="text-muted">Please choose an action from the sidebar</small>
                    </h1>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
