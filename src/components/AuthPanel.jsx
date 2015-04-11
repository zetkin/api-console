import React from 'react/addons';

export default class AuthPanel extends React.Component {
    render() {
        return (
            <div className="auth-panel">
                <input type="text" placeholder="E-mail"/>
                <input type="password" placeholder="password"/>
            </div>
        );
    }
}

