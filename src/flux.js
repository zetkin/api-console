import { Flummox } from 'flummox';

import SessionActions from './actions/session';
import SessionStore from './stores/session';


export default class Flux extends Flummox {
    constructor() {
        super();

        this.createActions('session', SessionActions, this);
        this.createStore('session', SessionStore, this);
    }
}
