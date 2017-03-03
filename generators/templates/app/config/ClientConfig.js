module.exports = Object.assign({
  title: 'SXI Bank',
  logo: 'base_logo.png',
  context: process.env.APP_CONTEXT,
  sideMenuUrl: '/' + process.env.APP_CONTEXT + '/cl/loadMenu',
  logoutUrl: '/' + process.env.APP_CONTEXT + '/logout',
  logoutRedir: process.env.LOGOUT_REDIR || 'http://localhost:3000/login/',
  googleMapsApiKey: "AIzaSyBYERLfZ7ZEy1ZD2NKNmLB2XmHTuNO7fCA",
  socketIO: {
    path: '/' + process.env.APP_CONTEXT + '/io/socket'
  },
  apiEndpoints: {
    logs: '/' + process.env.APP_CONTEXT + '/client.logger',
    account: {
      all: '/' + process.env.APP_CONTEXT + '/api/account/all',
      findAccountsByClientIdAndIsOwn: '/' + process.env.APP_CONTEXT + '/api/account/findAccountsByClientIdAndIsOwn',
      allowedDestAccts: '/' + process.env.APP_CONTEXT + '/api/account/findAllowedDestAcctsByClientIdFuncCdSrcTypeIdDestIsOwn',
      findByIdAndIsDel: '/' + process.env.APP_CONTEXT + '/api/account/findByIdAndIsDel',
      findWithModelPaginated: '/' + process.env.APP_CONTEXT + '/api/account/findWithModelPaginated'
    },
    activity: {
      all: '/' + process.env.APP_CONTEXT + '/api/activity',
    },
    fundtransfer: {
      search: '/' + process.env.APP_CONTEXT + '/api/fundtransfer/findWithModel',
      create: '/' + process.env.APP_CONTEXT + '/api/fundtransfer/create',
      all: '/' + process.env.APP_CONTEXT + '/api/fundtransfer',
      findByClientId: '/' + process.env.APP_CONTEXT + '/api/fundtransfer/findByClientId'
    },
    txnTrends: {
      add: '/' + process.env.APP_CONTEXT + '/api/corpsettings/save',
      update: '/' + process.env.APP_CONTEXT + '/api/corpsettings/update',
      delete: '/' + process.env.APP_CONTEXT + '/api/corpsettings/delete',
      search: '/' + process.env.APP_CONTEXT + '/api/corpsettings/findCriteria'
    },
    accountOpening: {
      create: '/' + process.env.APP_CONTEXT + '/api/account-request',
      validateClientInfo: '/' + process.env.APP_CONTEXT + '/api/account-request/validate/clientInfo',
      validateAccountInfo: '/' + process.env.APP_CONTEXT + '/api/account-request/validate/accountInfo',
      validateEmailCode: '/' + process.env.APP_CONTEXT + '/api/account-request/validate/email',
      validateSMSCode: '/' + process.env.APP_CONTEXT + '/api/account-request/validate/sms'
    },
    accountType: {
      all: '/' + process.env.APP_CONTEXT + '/api/accountType/all'
    }
  },
  fileUploadEndpoints: {
    single: '/' + process.env.APP_CONTEXT + '/api/file/document/post',
    link: '/' + process.env.APP_CONTEXT + '/api/file/document/link',
  }
});
