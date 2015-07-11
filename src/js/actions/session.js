import { Actions } from 'flummox';
import Z from 'zetkin';


export default class SessionActions extends Actions {
    constructor(flux) {
        super();
        this.flux = flux;
    }

    login(payload) {
        return new Promise(function(resolve, reject) {
            Z.authenticate(payload.username, payload.password,
                function(success, data, statusCode) {
                    if (success) {
                        resolve(data, statusCode);
                    }
                    else {
                        reject(data, statusCode);
                    }
                });
        });
    }

    logout() {
        // TODO: Better way to do this?
        var token = this.flux.getStore('session').getToken();
        var headers = {
            Authorization: 'Zetkin-Token ' + token
        }

        return new Promise(function(resolve, reject) {
            zetkin.req('DEL', '/session', headers, null, resolve);
        });
    }
}
