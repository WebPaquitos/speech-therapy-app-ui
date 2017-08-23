import React from 'react';
import { Col, Button, Card, CardImg, CardText, CardBlock,
    CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import Content from './content';
import { ROUTES } from '../common/constants';
import MASAImg from '../assets/img/masa.png';
import OtherImg from '../assets/img/other.png';

const NewEvaluation = () => {
    return (
        <Content title="New Evaluation" wrapperClass="spaced-grid">
            <Col
                xs="12"
                sm="12"
                md="12"
                lg="6"
                xl="4">
                <Card>
                    <CardImg
                        top
                        width="100%"
                        src={MASAImg}
                        alt="Card image cap" />
                    <CardBlock className="card-body">
                        <CardTitle>MASA</CardTitle>
                        <CardText>
                            MASA test to quickly evaluate the state of the patient relating to deglutation and other parameters.
                        </CardText>
                        <Link className="btn btn-primary btn-outline-primary bottom-left" to={ROUTES.MASA_TEST}>Start test</Link>
                    </CardBlock>
                </Card>
            </Col>
            <Col
                xs="12"
                sm="12"
                md="12"
                lg="6"
                xl="4">
                <Card>
                    <CardImg
                        top
                        width="100%"
                        src={OtherImg}
                        alt="Card image cap" />
                    <CardBlock className="card-body">
                        <CardTitle>Other tests</CardTitle>
                        <CardText>
                            Other tests with custom parameters are coming soon to this platform. Stay tuned.
                        </CardText>
                        <Button className="bottom-left" color="primary" outline disabled>Start test</Button>
                    </CardBlock>
                </Card>
            </Col>
        </Content>
    );
};

export default NewEvaluation;
