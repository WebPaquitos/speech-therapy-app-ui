import React, { Component } from 'react';
import ReactSidebar from 'react-sidebar';
import { Button } from 'reactstrap';
import { FaBars } from 'react-icons/lib/fa';

const mql = window.matchMedia('(min-width: 768px)');

class Sidebar extends Component {
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

    mediaQueryChanged() {
        this.setState({ sidebarDocked: this.state.mql.matches });
    }

    render() {
        const sidebarContentStyle = {
            root: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                zIndex: 3,
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
                width: '250px',
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
        const sidebarContent = (
            <b>Sidebar content</b>
        );

        return (
            <ReactSidebar
                sidebar={sidebarContent}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
                sidebarClassName="sidebar-ct"
                styles={sidebarContentStyle}>
                <div className="hidden-md-up">
                    <Button color="link" size="lg" onClick={this.onSetSidebarOpenClicked}><FaBars/></Button>
                </div>
            </ReactSidebar>
        );
    }
}

export default Sidebar;
