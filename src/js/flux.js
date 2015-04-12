import { Flummox } from 'flummox';

import SessionActions from './actions/session';
import ApiActions from './actions/api';
import SessionStore from './stores/session';
import ApiStore from './stores/api';


export default class Flux extends Flummox {
    constructor() {
        super();

        this.createActions('session', SessionActions, this);
        this.createActions('api', ApiActions, this);

        this.createStore('session', SessionStore, this);
        this.createStore('api', ApiStore, this);
    }
}
