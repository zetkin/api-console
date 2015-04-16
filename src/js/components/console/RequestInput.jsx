import React from 'react/addons';

import FluxComponent from '../FluxComponent';


export default class RequestInput extends FluxComponent {
    constructor() {
        super();

        this.state = {
            lastRequestMethod: 'get',
            lastRequestPath: '',
            lastRequestBody: ''
        };
    }

    componentDidMount() {
        this.listenTo('api', this.onStoreChange);
    }

    render() {
        return (
            <div className="request-input">
                <select ref="method" defaultValue={ this.state.lastRequestMethod }>
                    <option value="get">GET</option>
                    <option value="post">POST</option>
                    <option value="del">DELETE</option>
                    <option value="patch">PATCH</option>
                </select>

                <input ref="path" type="text"
                    placeholder="Request path?and=params"
                    onKeyUp={ this.onKeyUp.bind(this) }
                    defaultValue={ this.state.lastRequestPath }/>

                <textarea ref="body" placeholder="Request body"
                    defaultValue={ this.state.lastRequestBody }/>

                <input type="button" value="Execute" onClick={ this.onClickExecute.bind(this) }/>
            </div>
        );
    }

    onKeyUp(ev) {
        if (ev.keyCode == 13) {
            this.onClickExecute(ev);
        }
    }

    onClickExecute(ev) {
        this.getActions('api').makeRequest({
            method: this.refs.method.getDOMNode().value,
            path: this.refs.path.getDOMNode().value,
            body: this.refs.body.getDOMNode().value
        });
    }

    onStoreChange() {
        var lastRequest = this.getStore('api').getLastRequest();

        if (lastRequest) {
            this.setState({
                lastRequestPath: lastRequest.path,
                lastRequestBody: lastRequest.body,
                lastRequestMethod: lastRequest.method
            });
        }
    }
}
