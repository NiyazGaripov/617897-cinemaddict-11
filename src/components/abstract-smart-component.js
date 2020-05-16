import {AbstractComponent} from './abstract-component.js';

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }
}

export {AbstractSmartComponent};
