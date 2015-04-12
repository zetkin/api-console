import { Store } from 'flummox';


export default class ApiStore extends Store {
    constructor(flux) {
        super();

        this.setState({
            requestInProgress: false,
            lastRequest: null,
            lastResponse: null
        });

        var apiActions = flux.getActions('api');
        this.registerAsync(apiActions.makeRequest,
            this.onRequestBegin,
            this.onRequestComplete);
    }

    getLastRequest() {
        return this.state.lastRequest;
    }

    getLastResponse() {
        return this.state.lastResponse;
    }

    onRequestBegin(payload) {
        this.setState({
            requestInProgress: true,
            lastRequest: payload,
            lastResponse: null
        });
    }

    onRequestComplete(payload) {
        this.setState({
            requestInProgress: false,
            lastResponse: payload
        });
    }
}
