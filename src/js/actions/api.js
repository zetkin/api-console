import { Actions } from 'flummox';
import Z from 'zetkin';


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

        var resource = Z.resource(payload.path);

        return new Promise(function(resolve, reject) {
            var data = null;
            var onComplete = function(success, data, statusCode) {
                if (success) {
                    resolve(data, statusCode);
                }
                else {
                    reject(data, statusCode);
                }
            };

            if (payload.body) {
                data = JSON.parse(payload.body);
            }

            switch (payload.method) {
                case 'get':
                    resource.get(onComplete);
                    break;
                case 'put':
                    resource.put(data, onComplete);
                    break;
                case 'post':
                    resource.post(data, onComplete);
                    break;
                case 'patch':
                    resource.patch(data, onComplete);
                    break;
                case 'delete':
                    resource.del(onComplete);
                    break;
            }
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
