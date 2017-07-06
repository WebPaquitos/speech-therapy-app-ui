import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import { FaLock } from 'react-icons/lib/fa';
import { registerUser } from '../actions/index';
import { ROUTES } from '../common/constants';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            cpassword: '',
        };

        this.onRegisterClicked = this.onRegisterClicked.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onRegisterClicked() {
        this.props.registerUser(this.state, () => {
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
                        <Jumbotron className="small-form">
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
                            <InputGroup>
                                <InputGroupAddon>
                                    <FaLock/>
                                </InputGroupAddon>
                                <Input
                                    name="cpassword"
                                    placeholder="confirm password"
                                    type="password"
                                    value={this.state.cpassword}
                                    onChange={this.onInputChange}/>
                            </InputGroup>
                            <br/>
                            <p className="lead d-flex justify-content-end">
                                <Button color="link" onClick={this.onRegisterClicked}>Register</Button>
                            </p>
                        </Jumbotron>
                        <div className="d-flex justify-content-end">
                            <Link
                                className="btn btn-sm btn-link follow-up-btn"
                                to={ROUTES.LOGIN}>
                                Already have an account? Login
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(null, { registerUser })(Register);
