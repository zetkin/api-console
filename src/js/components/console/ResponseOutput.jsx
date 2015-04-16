import React from 'react/addons';
import TreeView from 'react-tree-component';

import FluxComponent from '../FluxComponent';
import TabPanel from '../misc/TabPanel';
import { Tab } from '../misc/TabPanel';


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
        var bodyData = this.state.lastResponseBody;
        var bodyString = JSON.stringify(bodyData, null, 2);

        return (
            <div className="response-output">
                <TabPanel>
                    <Tab tabTitle="Tree">
                        <TreeView data={ bodyData }/>
                    </Tab>
                    <Tab tabTitle="Text">
                        <textarea readOnly={ true } value={ bodyString }/>
                    </Tab>
                </TabPanel>
            </div>
        );
    }

    onStoreChange() {
        this.setState({
            lastResponseBody: this.getStore('api').getLastResponse()
        });
    }
}
