/**
* {{ properCase name }}Store.js
*/

import { observable, extendObservable, action, asMap, reaction, autorunm, toJS } from "mobx";
import _ from 'underscore';
import StringUtil from 'string';
import { BaseMiddlewares } from 'frontend-react-f4-base-commons';
const { ClientMiddleware } = BaseMiddlewares;
import RequestUtils from '../utils/RequestUtils';
import F4BaseStore from './F4BaseStore';
import scrollToTop from '../utils/scrollToTop';
import ScrollUtils from '../utils/ScrollUtils';

export default class {{ properCase name }}Store extends F4BaseStore {

  constructor({{ properCase name }}Store) {
    super();
    if({{ properCase name }}Store) {
      Object.assign(this, {{ properCase name }}Store);
    }
  }

}
