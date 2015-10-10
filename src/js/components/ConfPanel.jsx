import React from 'react/addons';

import FluxComponent from './FluxComponent';


export default class ConfPanel extends FluxComponent {
    componentDidMount() {
        this.listenTo('api', this.forceUpdate);
    }

    render() {
        const apiStore = this.getStore('api');
        const apiHost = apiStore.getAPIHost();
        const apiPort = apiStore.getAPIPort();

        return (
            <div className="auth-panel">
                <label htmlFor="apiHost">API Host</label>
                <input type="text" id="apiHost" name="apiHost"
                    value={ apiHost }
                    onChange={ this.onChangeHost.bind(this) }/>
                <label htmlFor="apiPort">API Port</label>
                <input type="text" id="apiPort" name="apiPort"
                    value={ apiPort }
                    onChange={ this.onChangePort.bind(this) }/>
            </div>
        );
    }

    onChangeHost(ev) {
        const apiActions = this.getActions('api');
        const apiStore = this.getStore('api');
        apiActions.configure(ev.target.value, apiStore.getAPIPort());
    }

    onChangePort(ev) {
        const apiActions = this.getActions('api');
        const apiStore = this.getStore('api');
        apiActions.configure(apiStore.getAPIHost(), ev.target.value);
    }
}
