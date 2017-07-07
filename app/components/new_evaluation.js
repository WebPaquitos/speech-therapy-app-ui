import React from 'react';
import { Row, Col, Button, Card, CardImg, CardText, CardBlock,
    CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../common/constants';

const NewEvaluation = () => {
    return (
        <div className="content">
            <Row>
                <Col xs="12">
                    <h1 className="push-down">New Evaluation</h1>
                    <Row>
                        <Col
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                            xl="4">
                            <Card>
                                <CardImg
                                    top
                                    width="100%"
                                    src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                    alt="Card image cap" />
                                <CardBlock>
                                    <CardTitle>MASA</CardTitle>
                                    <CardText>
                                        MASA test to quickly evaluate the state of the patient relating to deglutation and other parameters.
                                    </CardText>
                                    <Link className="btn btn-primary btn-outline-primary" to={ROUTES.MASA_TEST}>Start test</Link>
                                </CardBlock>
                            </Card>
                        </Col>
                        <Col
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                            xl="4">
                            <Card>
                                <CardImg
                                    top
                                    width="100%"
                                    src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                    alt="Card image cap" />
                                <CardBlock>
                                    <CardTitle>Other tests</CardTitle>
                                    <CardText>
                                        Other tests with custom parameters are coming soon to this platform. Stay tuned.
                                    </CardText>
                                    <Button color="primary" outline disabled>Start test</Button>
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default NewEvaluation;
