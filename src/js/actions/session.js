import { Actions } from 'flummox';
import Z from 'zetkin';


export default class SessionActions extends Actions {
    constructor(flux) {
        super();
        this.flux = flux;
    }

    login(payload) {
        return Z.authenticate(payload.username, payload.password);
    }

    logout() {
        // TODO: Better way to do this?
        return Z.resource('/session').del();
    }
}
