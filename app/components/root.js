import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';

class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Root;
