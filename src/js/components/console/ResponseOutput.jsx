import React from 'react/addons';

import FluxComponent from '../FluxComponent';


export default class ResponseOutput extends FluxComponent {
    constructor() {
        super();

        this.state = {
            lastResponseBody: ''
        };
    }

    componentDidMount() {
        this.listenTo('api', this.onStoreChange);
    }

    render() {
        var body = JSON.stringify(this.state.lastResponseBody, null, 2);

        return (
            <div className="response-output">
                <textarea readOnly={ true } value={ body }/>
            </div>
        );
    }

    onStoreChange() {
        this.setState({
            lastResponseBody: this.getStore('api').getLastResponse()
        });
    }
}
