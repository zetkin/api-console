import React from 'react/addons';

import RequestInput from './RequestInput';
import ResponseOutput from './ResponseOutput';
import ApiHistoryList from './ApiHistoryList';
import FluxComponent from '../FluxComponent';


export default class ConsolePanel extends FluxComponent {
    componentDidMount() {
        this.listenTo('api', this.onStoreChange);
    }

    render() {
        var apiCall = this.getStore('api').getLastRequest();
        var response = this.getStore('api').getLastResponse();

        return (
            <div className="console-panel">
                <ApiHistoryList/>
                <RequestInput defaultValues={ apiCall }/>
                <ResponseOutput response={ response }/>
            </div>
        );
    }

    onStoreChange() {
        this.forceUpdate();
    }
}
