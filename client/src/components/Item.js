import React, { Component, Fragment } from 'react';

export class LogoutWindow extends Component {
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href='#'>
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}
