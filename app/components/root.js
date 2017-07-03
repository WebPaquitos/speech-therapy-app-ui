import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Login from './login';
import Home from './home';
import Dashboard from './dashboard';
import Sidebar from '../containers/sidebar';

class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Sidebar/>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/dashboard" component={Dashboard}/>
                        </Switch>
                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}

export default Root;
