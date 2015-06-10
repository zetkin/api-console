import { Actions } from 'flummox';

import zetkin from '../utils/api';


export default class ApiActions extends Actions {
    constructor(flux) {
        super();

        this.flux = flux;
    }

    makeRequest(payload) {
        var headers = null;
        var token = this.flux.getStore('session').getToken();

        if (token) {
            headers = {
                Authorization: 'Zetkin-Token ' + token
            }
        }

        return new Promise(function(resolve, reject) {
            zetkin.req(payload.method, payload.path, headers, payload.body, resolve);
        });
    }

    selectHistoricApiCall(index) {
        return index;
    }

    restoreHistory() {
        return true;
    }

    clearHistory() {
        return true;
    }
}
