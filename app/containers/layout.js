import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem, Container } from 'reactstrap';
import { FaBars } from 'react-icons/lib/fa';
import avatarImg from '../assets/img/avatar.png';
import JoanaImg from '../assets/img/joana_avatar.jpg';
import { ROUTES } from '../common/constants';
import Login from './auth/login';
import Register from './auth/register';
import Logout from './auth/logout';
import Dashboard from '../components/dashboard';
import NewEvaluation from '../components/new_evaluation';
import MASAEvaluation from './masa_evaluation';
import History from './history';
import HistoryItem from './history_item';
import Patients from './patients';
import PatientDetails from '../containers/patient_details';
import RequireAuth from './auth/require_auth';
import Index from '../containers/index';
import { logoutUser } from '../actions';

const mql = window.matchMedia('(min-width: 992px)');

class Layout extends Component {
    constructor(props) {
        super(props);
        const { docked, open } = props;
        this.state = {
            mql,
            docked,
            open,
        };
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.onSetSidebarOpenClicked = this.onSetSidebarOpenClicked.bind(this);
        this.onSidebarActionClicked = this.onSidebarActionClicked.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
        this.setState({ mql, sidebarDocked: mql.matches });
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    onSetSidebarOpenClicked() {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }

    onSidebarActionClicked() {
        this.onSetSidebarOpenClicked();
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: this.state.mql.matches });
    }

    render() {
        const { isLogged, user } = this.props.session;
        const sidebarContentStyle = {
            root: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                zIndex: 1,
            },
            sidebar: {
                zIndex: 4,
                position: 'absolute',
                top: 0,
                bottom: 0,
                transition: 'transform .3s ease-out',
                WebkitTransition: '-webkit-transform .3s ease-out',
                willChange: 'transform',
                overflowY: 'auto',
                backgroundColor: 'rgba(250,250,250,1)',
                width: '400px',
            },
            content: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'scroll',
                WebkitOverflowScrolling: 'touch',
                transition: 'left .3s ease-out, right .3s ease-out',
            },
            overlay: {
                zIndex: 1,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0,
                visibility: 'hidden',
                transition: 'opacity .3s ease-out, visibility .3s ease-out',
                backgroundColor: 'rgba(0,0,0,0)',
            },
            dragHandle: {
                zIndex: 1,
                position: 'fixed',
                top: 0,
                bottom: 0,
            },
        };
        const invisible = !isLogged ? 'invisible' : '';
        const sidebarContent = (
            <div>
                <img src={isLogged && user.name === 'Joana Faria' ? JoanaImg : avatarImg} alt="avatar" className="img-fluid mx-auto d-block"/>
                <br/>
                <h2>{isLogged ? user.name : 'Please Login'}</h2>
                <br/>
                <br/>
                <div className={`push-down ${invisible}`}>
                    <Link
                        className="btn btn-primary btn-outline-primary"
                        to={ROUTES.NEW_EVALUATION}
                        onClick={this.onSidebarActionClicked}>
                        New Evaluation
                    </Link>
                </div>
                <ListGroup className={`${invisible}`}>
                    <ListGroupItem>
                        <Link
                            className="btn btn-link btn-block"
                            to={ROUTES.PATIENTS}
                            onClick={this.onSidebarActionClicked}>
                            Patients
                        </Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link
                            className="btn btn-link btn-block"
                            to={ROUTES.HISTORY}
                            onClick={this.onSidebarActionClicked}>
                            History
                        </Link>
                    </ListGroupItem>
                </ListGroup>
                <div className={`text-center bottom ${invisible}`}>
                    <Link
                        className="btn btn-link"
                        to={ROUTES.LOGOUT}
                        onClick={this.onSidebarActionClicked}>
                        Logout
                    </Link>
                </div>
            </div>
        );

        return (
            <Router>
                <Sidebar
                    sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                    sidebarClassName="sidebar-ct"
                    styles={sidebarContentStyle}>
                    <div className="d-lg-none d-xl-none">
                        <Button color="link" size="lg" onClick={this.onSetSidebarOpenClicked}><FaBars/></Button>
                    </div>
                    <Container>
                        <Switch>
                            <Route exact path={ROUTES.BASE} component={Index}/>
                            <Route path={ROUTES.LOGIN} component={Login}/>
                            <Route path={ROUTES.LOGOUT} component={Logout}/>
                            <Route path={ROUTES.REGISTER} component={Register}/>
                            <Route path={ROUTES.DASHBOARD} component={RequireAuth(Dashboard)}/>
                            <Route path={ROUTES.NEW_EVALUATION} component={RequireAuth(NewEvaluation)}/>
                            <Route path={ROUTES.MASA_TEST} component={RequireAuth(MASAEvaluation)}/>
                            <Route path={ROUTES.SHOW_HISTORY_ITEM} component={RequireAuth(HistoryItem)}/>
                            <Route path={ROUTES.HISTORY} component={RequireAuth(History)}/>
                            <Route path={ROUTES.SHOW_PATIENT} component={RequireAuth(PatientDetails)}/>
                            <Route path={ROUTES.PATIENTS} component={RequireAuth(Patients)}/>
                        </Switch>
                    </Container>
                </Sidebar>
            </Router>
        );
    }
}

function mapStateToProps({ session }) {
    return {
        session,
    };
}

export default connect(mapStateToProps, { logoutUser })(Layout);
