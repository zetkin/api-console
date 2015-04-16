import { Store } from 'flummox';


export default class ApiStore extends Store {
    constructor(flux) {
        super();

        this.setState({
            requestInProgress: false,
            history: [],
            selectedHistoryIndex: -1,
            lastResponse: null
        });

        var apiActions = flux.getActions('api');
        this.register(apiActions.selectHistoricApiCall, this.onSelectApiCall);
        this.registerAsync(apiActions.makeRequest,
            this.onRequestBegin,
            this.onRequestComplete);
    }

    getHistory() {
        return this.state.history;
    }

    getLastRequest() {
        if (this.state.selectedHistoryIndex >= 0 &&
                this.state.selectedHistoryIndex < this.state.history.length) {

            return this.state.history[this.state.selectedHistoryIndex];
        }
    }

    getLastResponse() {
        return this.state.lastResponse;
    }

    onSelectApiCall(index) {
        this.setState({
            selectedHistoryIndex: index,
            lastResponse: null
        });
    }

    onRequestBegin(payload) {
        var history = this.state.history.concat([ payload ]);
        this.setState({
            requestInProgress: true,
            history: history,
            selectedHistoryIndex: history.length - 1,
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
