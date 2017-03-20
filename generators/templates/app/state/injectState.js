import { BaseStores } from 'frontend-react-f4-base-commons';

const { UIStore, AuthStore, AppStore } = BaseStores;




/* plop will append store imports here */


export default (state) => ({
  ui: new UIStore(state.ui),
  auth: new AuthStore(state.auth),
  app: new AppStore(state.app),
  //add your stores here

  /* plop will append stores here */

});
