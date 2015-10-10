import React from 'react/addons';
import FluxComponent from 'flummox/component';

import Flux from './flux';
import App from './components/App';


window.onload = function() {
    var flux = new Flux();
    var div = document.getElementById('ctr');
    React.render(<FluxComponent flux={ flux }><App/></FluxComponent>, div);
    flux.getActions('api').restoreHistory();
};
