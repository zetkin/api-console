import React from 'react/addons';

import App from './components/App';


window.onload = function() {
    var div = document.getElementById('ctr');
    React.render(<App/>, div);
};
