import { Store } from 'flummox';


const HISTORY_STORE_NAME = 'apiCallHistory';

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
        this.register(apiActions.restoreHistory, this.onRestoreStoredHistory);
        this.register(apiActions.clearHistory, this.onClearStoredHistory);
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

    hasStoredHistory() {
        var json = localStorage.getItem(HISTORY_STORE_NAME);

        if (history) {
            return true;
        }
        else {
            return false;
        }
    }

    onSelectApiCall(index) {
        this.setState({
            selectedHistoryIndex: index,
            lastResponse: null
        });
    }

    onRestoreStoredHistory() {
        var history;
        var json = localStorage.getItem(HISTORY_STORE_NAME);

        try {
            history = JSON.parse(json);
        }
        catch (e) {
            history = [];
        }

        this.setState({
            history: history,
            selectedHistoryIndex: -1,
            lastResponse: null
        });
    }

    onClearStoredHistory() {
        var history = [];
        localStorage.setItem(HISTORY_STORE_NAME, history);
        this.setState({
            history: history,
            selectedHistoryIndex: -1,
            lastResponse: null
        });
    }

    onRequestBegin(payload) {
        var history = [ payload ].concat(this.state.history);
        this.setState({
            requestInProgress: true,
            history: history,
            selectedHistoryIndex: 0,
            lastResponse: null
        });

        localStorage.setItem(HISTORY_STORE_NAME, JSON.stringify(history));
    }

    onRequestComplete(payload) {
        this.setState({
            requestInProgress: false,
            lastResponse: payload
        });
    }
}
