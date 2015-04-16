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

        return (
            <ul className="apihistory">
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
        );
    }

    onStoreChange() {
        var history = this.getStore('api').getHistory();

        this.setState({
            history: history,
            selectedIndex: history.length - 1
        });
    }
}
