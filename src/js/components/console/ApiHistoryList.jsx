import React from 'react/addons';

import FluxComponent from '../FluxComponent';


export default class ApiHistoryList extends FluxComponent {
    constructor() {
        super();

        this.state = {
            history: [],
            selectedIndex: 0
        };
    }

    componentDidMount() {
        this.listenTo('api', this.onStoreChange);
    }

    render() {
        var apiActions = this.getActions('api');
        var clearButton = null;

        if (this.state.history.length > 0) {
            clearButton = <input type="button" value="Clear"
                onClick={ this.onClearClick.bind(this) }/>;
        }

        return (
            <div className="apihistory">
                <ul>
                {this.state.history.map(function(request, index) {
                    var onClick = function(ev) {
                        apiActions.selectHistoricApiCall(index);
                    };

                    return (
                        <li key={ index } onClick={ onClick }>
                            <span className="method">{ request.method }</span>
                            <span className="path">{ request.path }</span>
                        </li>
                    );
                }, this)}
                </ul>
                { clearButton }
            </div>
        );
    }

    onClearClick() {
        var apiActions = this.getActions('api');
        apiActions.clearHistory();
    }

    onStoreChange() {
        var history = this.getStore('api').getHistory();

        this.setState({
            history: history,
            selectedIndex: history.length - 1
        });
    }
}
