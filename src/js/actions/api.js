import { Actions } from 'flummox';
import Z from 'zetkin';


export default class ApiActions extends Actions {
    constructor(flux) {
        super();

        this.flux = flux;
    }

    makeRequest(payload) {
        var resource = Z.resource(payload.path);
        var data = null;

        if (payload.body) {
            data = JSON.parse(payload.body);
        }

        switch (payload.method) {
            case 'get':
                return resource.get();
            case 'put':
                return resource.put(data);
            case 'post':
                return resource.post(data);
            case 'patch':
                return resource.patch(data);
            case 'del':
                return resource.del();
        }
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
