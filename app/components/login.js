import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Button, InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import { FaUser, FaLock } from 'react-icons/lib/fa';
import { loginUser } from '../actions/index';
import { ROUTES } from '../common/constants';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.onLoginClicked = this.onLoginClicked.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onLoginClicked() {
        this.props.loginUser(this.state, () => {
            this.props.history.push(ROUTES.DASHBOARD);
        });
    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col
                        xs={{ size: 8, push: 2 }}
                        sm={{ size: 8, push: 2 }}
                        md={{ size: 8, push: 2 }}
                        lg={{ size: 6, push: 3 }}
                        xl={{ size: 4, push: 4 }}>
                        <Jumbotron>
                            <InputGroup>
                                <InputGroupAddon>
                                    <FaUser/>
                                </InputGroupAddon>
                                <Input
                                    name="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.onInputChange}/>
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon>
                                    <FaLock/>
                                </InputGroupAddon>
                                <Input
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onInputChange}/>
                            </InputGroup>
                            <br/>
                            <p className="lead d-flex justify-content-end">
                                <Button color="link" size="sm" onClick={this.onLoginClicked}>Login</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(null, { loginUser })(Login);
