import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Login from './login';
import Home from './home';
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
                        </Switch>
                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}

export default Root;
