/**
* {{ properCase name }}ModelStore.js
*/

import { observable, action, computed, autorun, reaction, toJS } from 'mobx';
import F4BaseFinancialModelStore from '../F4BaseFinancialModelStore';

export default class {{ properCase name }}ModelStore extends F4BaseFinancialModelStore {

  constructor({{ properCase name }}ModelStore) {
    super();
    Object.assign(this, {{ properCase name }}ModelStore);
  }

}
