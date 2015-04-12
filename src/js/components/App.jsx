import React from 'react/addons';

import AuthPanel from './AuthPanel';
import ConsolePanel from './console/ConsolePanel';


export default class App extends React.Component {
    render() {
        return (
            <div className="api-console">
                <AuthPanel/>
                <ConsolePanel/>
            </div>
        );
    }
}
