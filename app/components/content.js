import React from 'react';
import { Row, Col } from 'reactstrap';

export default function (props) {
    return (
        <div className="content">
            <Row>
                <Col>
                    <h1 className="push-down">{props.title}</h1>
                    <Row className={props.wrapperClass}>
                        {props.children}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
