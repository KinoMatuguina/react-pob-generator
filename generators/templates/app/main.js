import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, browserHistory, match } from 'react-router';

import { BaseStateMethods, BaseContext } from 'frontend-react-f4-base-commons';

const { rehydrate } = BaseStateMethods;
const { ContextProvider } = BaseContext;

import { fetchDataOnLocationMatch } from './utils/fetch';
import routes from './routes';
import ClientConfig from './config/ClientConfig';

require('velocity-animate');
require('velocity-animate/velocity.ui');

$("#loader").fadeOut("slow");

import injectState from './state/injectState';

const store = rehydrate(injectState);
fetchDataOnLocationMatch(browserHistory, routes, match, store);

// console.log(browserHistory);
// console.log(routes);
// console.log(match);
// console.log(store);


import ClientLogger from './utils/ClientLogger';

const LOGGER = new ClientLogger("MAIN", ClientConfig.apiEndpoints.logs);

LOGGER.error("ERROR LOG FROM CLIENT");
LOGGER.debug("DEBUG LOG FROM CLIENT");
LOGGER.warn("WARN LOG FROM CLIENT");
LOGGER.info("INFO LOG FROM CLIENT");

const scrollFunction = function() {
  if (typeof window !== 'undefined') {
    window.scrollTo(0,0);
  }
}

ReactDOM.render(
  <ContextProvider context={{ store }}>
    <Router onUpdate={scrollFunction} routes={routes} history={browserHistory} />
  </ContextProvider>,
  document.getElementById('root'));
