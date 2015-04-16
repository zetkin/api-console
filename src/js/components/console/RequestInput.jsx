import React from 'react/addons';

import FluxComponent from '../FluxComponent';


export default class RequestInput extends FluxComponent {
    constructor() {
        super();

        this.state = {
            method: '',
            path: '',
            body: ''
        };
    }

    componentDidMount() {
        this.listenTo('api', this.onStoreChange);
    }

    render() {
        return (
            <div className="request-input">
                <select ref="method" value={ this.state.method }
                    onChange={ this.onChangeMethod.bind(this) }>

                    <option value="get">GET</option>
                    <option value="post">POST</option>
                    <option value="del">DELETE</option>
                    <option value="patch">PATCH</option>
                </select>

                <input ref="path" type="text"
                    placeholder="Request path?and=params"
                    onChange={ this.onChangePath.bind(this) }
                    onKeyUp={ this.onKeyUp.bind(this) }
                    value={ this.state.path }/>

                <textarea ref="body" placeholder="Request body"
                    onChange={ this.onChangeBody.bind(this) }
                    value={ this.state.body }/>

                <input type="button" value="Execute" onClick={ this.onClickExecute.bind(this) }/>
            </div>
        );
    }

    onKeyUp(ev) {
        if (ev.keyCode == 13) {
            this.onClickExecute(ev);
        }
    }

    onChangeMethod(ev) {
        this.setState({
            method: ev.target.value
        });
    }

    onChangePath(ev) {
        this.setState({
            path: ev.target.value
        });
    }

    onChangeBody(ev) {
        this.setState({
            body: ev.target.value
        });
    }

    onClickExecute(ev) {
        this.getActions('api').makeRequest({
            method: this.refs.method.getDOMNode().value,
            path: this.refs.path.getDOMNode().value,
            body: this.refs.body.getDOMNode().value
        });
    }

    onStoreChange(ev) {
        var lastRequest = this.getStore('api').getLastRequest();

        if (lastRequest) {
            this.setState({
                method: lastRequest.method,
                path: lastRequest.path,
                body: lastRequest.body
            });
        }
    }
}
