import { Store } from 'flummox';


export default class SessionStore extends Store {
    constructor(flux) {
        super();

        this.setState({
            username: null,
            token: null
        });

        var sessionActions = flux.getActions('session');
        this.registerAsync(sessionActions.login, this.onLoginBegin, this.onLoginComplete);
        this.registerAsync(sessionActions.logout, this.onLogoutBegin);
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

    onLoginComplete(payload) {
        this.setState({
            token: payload.data.token
        });
    }

    onLogoutBegin() {
        this.setState({
            token: null
        });
    }
}
