import React from 'react/addons';

import FluxComponent from './FluxComponent';


export default class AuthPanel extends FluxComponent {
    componentDidMount() {
        this.listenTo('session', this.onStoreChange);
    }

    render() {
        var sessionStore = this.getStore('session');

        if (sessionStore.isAuthenticated()) {
            return (
                <div className="auth-panel">
                    Logged in as { sessionStore.getUsername() } with token { sessionStore.getToken() }.
                    <input type="button" value="Log out" onClick={ this.onClickLogout.bind(this) }/>
                </div>
            )
        }
        else {
            return (
                <div className="auth-panel">
                    <input ref="email" type="text" defaultValue="testuser@example.com"/>
                    <input ref="password" type="text" defaultValue="password"/>
                    <input type="button" value="Log in" onClick={ this.onClickLogin.bind(this) }/>
                </div>
            );
        }
    }

    onStoreChange() {
        this.forceUpdate();
    }

    onClickLogin(ev) {
        this.getActions('session').login({
            username: this.refs.email.getDOMNode().value,
            password: this.refs.password.getDOMNode().value
        });
    }

    onClickLogout(ev) {
        this.getActions('session').logout();
    }
}

