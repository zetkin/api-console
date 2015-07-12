import { Store } from 'flummox';
import Z from 'zetkin';


export default class SessionStore extends Store {
    constructor(flux) {
        super();

        this.setState({
            username: null,
            token: null
        });

        var sessionActions = flux.getActions('session');
        this.registerAsync(sessionActions.login, this.onLoginBegin, this.onLoginComplete);
        this.registerAsync(sessionActions.logout, this.onLogoutBegin, this.onLogoutComplete);
    }

    isAuthenticated() {
        return this.state.token !== null;
    }

    getToken() {
        return this.state.token;
    }

    getUsername() {
        return this.state.username;
    }

    onLoginBegin(payload) {
        this.setState({
            username: payload.username
        });
    }

    onLoginComplete(data, statusCode) {
        this.setState({
            token: Z.getToken()
        });
    }

    onLogoutBegin() {
        this.setState({
            token: null
        });
    }

    onLogoutComplete() {
        // TODO: Remove after finding better way to logout in action
        Z.setToken(null);
    }
}
