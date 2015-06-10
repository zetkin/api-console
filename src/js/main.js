import React from 'react/addons';
import FluxComponent from 'flummox/component';

import Flux from './flux';
import App from './components/App';
import zetkin from './utils/api';


window.onload = function() {
    // TODO: Don't hardcode this
    zetkin.configure({
        host: '192.168.59.103',
        port: 8080
    });

    var flux = new Flux();
    var div = document.getElementById('ctr');
    React.render(<FluxComponent flux={ flux }><App/></FluxComponent>, div);
    flux.getActions('api').restoreHistory();
};
