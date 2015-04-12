import { Actions } from 'flummox';

import zetkin from '../utils/api';


export default class SessionActions extends Actions {
    constructor(flux) {
        super();
        this.flux = flux;
    }

    login(payload) {
        var credentials = payload.username + ':' + payload.password;
        var b64cred = new Buffer(credentials).toString('base64');

        var headers = {
            Authorization: 'Basic ' + b64cred
        }

        return new Promise(function(resolve, reject) {
            zetkin.req('POST', '/auth/session', headers, null, resolve);
        });
    }

    logout() {
        // TODO: Better way to do this?
        var token = this.flux.getStore('session').getToken();
        var headers = {
            Authorization: 'Zetkin-Token ' + token
        }

        return new Promise(function(resolve, reject) {
            zetkin.req('DEL', '/auth/session', headers, null, resolve);
        });
    }
}
