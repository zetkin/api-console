import React from 'react/addons';

import AuthPanel from './AuthPanel';
import ConfPanel from './ConfPanel';
import ConsolePanel from './console/ConsolePanel';


export default class App extends React.Component {
    render() {
        return (
            <div className="api-console">
                <ConfPanel/>
                <AuthPanel/>
                <ConsolePanel/>
            </div>
        );
    }
}
