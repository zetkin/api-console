import React from 'react/addons';
import TreeView from 'react-tree-component';

import TabPanel from '../misc/TabPanel';
import { Tab } from '../misc/TabPanel';


export default class ResponseOutput extends React.Component {
    render() {
        var bodyData = this.props.response;
        var bodyString = JSON.stringify(bodyData, null, 2);

        if (!bodyData) {
            bodyData = {};
        }

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
}
