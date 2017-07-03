import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Login from './login';
import Home from './home';
import Dashboard from './dashboard';
import NewEvaluation from '../components/new_evaluation';
import Sidebar from '../containers/sidebar';
import { ROUTES } from '../common/constants';

class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Sidebar/>
                    <Container>
                        <Switch>
                            <Route exact path={ROUTES.BASE} component={Home}/>
                            <Route path={ROUTES.LOGIN} component={Login}/>
                            <Route path={ROUTES.DASHBOARD} component={Dashboard}/>
                            <Route path={ROUTES.NEW_EVALUATION} component={NewEvaluation}/>
                        </Switch>
                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}

export default Root;
