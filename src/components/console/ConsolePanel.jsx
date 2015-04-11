import React from 'react/addons';

import RequestInput from './RequestInput';
import ResponseOutput from './ResponseOutput';


export default class ConsolePanel extends React.Component {
    render() {
        return (
            <div className="console-panel">
                <RequestInput/>
                <ResponseOutput/>
            </div>
        );
    }
}
