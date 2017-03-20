import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { BaseContext } from 'frontend-react-f4-base-commons';
import { BaseContainers } from 'frontend-react-f4-base-ui';

import App from './containers/App/App';

/* plop will append container imports here */

const { connect } = BaseContext;

import ClientConfig from './config/ClientConfig';

const path = "/" + ClientConfig.context;


export default (
  <Route path={path} component={App}>
    {/*
      <IndexRoute component={FundTransferCTR} />
      <Route path={path + "/corplimits"} component={TxnTrendsCLSCTR} />
      <Route path={path + "/corplimits/search"} component={TxnTrendsCLSSearchCTR} />
      <Route path={path + "/corplimits/view"} component={TxnTrendsCorpLimitSettingsDetails} />
      <Route path={path + "/corplimits/edit"} component={TxnTrendsCLSEditCTR} />
      <Route path="*" component={App}/>
    */}

    {/*
      <IndexRoute component={TxnTrendsCLSCTR} />
      <Route path={path + "/search"} component={TxnTrendsCLSSearchCTR} />
      <Route path={path + "/view"} component={TxnTrendsCorpLimitSettingsDetails} />
      <Route path={path + "/edit"} component={TxnTrendsCLSEditCTR} />
      <Route path="*" component={App}/>

    */}
    {/*<IndexRoute component={AccountInquiryCTR} />*/}
    
    {/* plop will append routes here */}

    <Route path="*" component={App}/>
  </Route>
);
