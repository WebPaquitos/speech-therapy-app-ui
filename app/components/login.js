import React from 'react';
import { Jumbotron, Button, InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import { FaUser, FaLock } from 'react-icons/lib/fa';

const Login = () => {
    return (
        <div className="content">
            <Row>
                <Col xs={{ size: 8, push: 2 }} sm={{ size: 8, push: 2 }} md={{ size: 6, push: 3 }} lg={{ size: 4, push: 4 }}>
                    <Jumbotron>
                        <InputGroup>
                            <InputGroupAddon><FaUser/></InputGroupAddon>
                            <Input placeholder="username" />
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon><FaLock/></InputGroupAddon>
                            <Input placeholder="password" />
                        </InputGroup>
                        <br/>
                        <p className="lead d-flex justify-content-end">
                            <Button color="link" size="sm">Login</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
