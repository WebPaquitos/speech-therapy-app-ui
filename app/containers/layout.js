import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem, Container } from 'reactstrap';
import { FaBars } from 'react-icons/lib/fa';
import avatar from '../assets/img/avatar.png';
import { ROUTES } from '../common/constants';
import Login from '../components/login';
import Register from '../components/register';
import Logout from './logout';
import Dashboard from '../components/dashboard';
import NewEvaluation from '../components/new_evaluation';
import { logoutUser } from '../actions/index';

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
                <img src={avatar} alt="login" className="img-fluid mx-auto d-block"/>
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
                    <ListGroupItem><Button color="link" block>Patients</Button></ListGroupItem>
                    <ListGroupItem><Button color="link" block>History</Button></ListGroupItem>
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
                    <div className="hidden-lg-up">
                        <Button color="link" size="lg" onClick={this.onSetSidebarOpenClicked}><FaBars/></Button>
                    </div>
                    <Container>
                        <Switch>
                            <Route
                                exact
                                path={ROUTES.BASE}
                                render={() => (
                                    isLogged ? (<Redirect to={ROUTES.DASHBOARD}/>) : (<Redirect to={ROUTES.LOGIN}/>)
                                )}/>
                            <Route path={ROUTES.LOGIN} component={Login}/>
                            <Route path={ROUTES.LOGOUT} component={Logout}/>
                            <Route path={ROUTES.REGISTER} component={Register}/>
                            <Route path={ROUTES.DASHBOARD} component={Dashboard}/>
                            <Route path={ROUTES.NEW_EVALUATION} component={NewEvaluation}/>
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
