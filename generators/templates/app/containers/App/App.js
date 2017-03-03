import React, { Component, PropTypes } from 'react';
import DevTools from 'mobx-react-devtools';
import keydown from 'react-keydown';
import _ from 'underscore';
import { AppBar, AppBarSubComponent } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'react-fontawesome';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuItem from 'material-ui/MenuItem';
import Collapse from 'react-collapse';

const isDeveloping = process.env.NODE_ENV !== 'production'

import { BaseContainers, BaseComponents, F4Theme} from 'frontend-react-f4-base-ui';
import { BaseContext } from 'frontend-react-f4-base-commons';

const  {
  F4WithNavContainer,
  F4BaseContainer
} = BaseContainers;

const {
  F4MuiHeader
} = BaseComponents;

// console.log(F4Theme.baseTheme);/

const { connect } = BaseContext;

import { MatchMediaProvider } from '../../utils/MatchMediaProvider';
// import F4Muiheader from '../../components/F4Muiheader/F4Muiheader'
import ClientConfig from '../../config/ClientConfig';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import io from 'socket.io-client';
import { Scrollbars } from 'react-custom-scrollbars';
let socket = io('');

injectTapEventPlugin();
@connect
export default class App extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.toggleMobxDevTool = this.toggleMobxDevTool.bind(this);
    this.updateScreenWidth = this.updateScreenWidth.bind(this);
    this._handleDrawer = this._handleDrawer.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isMobxDevToolVisible: false,
      open: false,
      childOpen: false,
      newChildOpen: 0
    };
  }
  _handleAccordion(i) {
    // console.log(i)
    this.setState({
      newChildOpen: i,
      childOpen: !this.state.childOpen
    })
  }

  _handleDrawer() {
    if(!this.state.open) {
      this.setState({
        open: !this.state.open
      })
    }
  }

  logout() {
    const { auth } = this.context.store;
    auth.logout(ClientConfig.logoutUrl, ClientConfig.logoutRedir);

  }
  updateScreenWidth(width) {
    const { ui } = this.context.store;
    ui.updateScreenWidth(width);

  }
  componentDidMount() {
    const { ui } = this.context.store;
    const apiUrl = ClientConfig.sideMenuUrl;
    ui.sideDrawer.loadMenu(apiUrl);
    // socket.emit('login', {
    //   user: {
    //     username: 'jorgei'
    //   }
    // });
  }
  @keydown('ctrl+h')
  toggleMobxDevTool() {
    this.setState({
      isMobxDevToolVisible: !this.state.isMobxDevToolVisible
    });
  }
  getMobxDevTool() {

    let mobxTool;

    if (isDeveloping && this.state.isMobxDevToolVisible) {
      mobxTool = (
        <DevTools/>
      );
    }

    return mobxTool;
  }
  render() {

    const { auth, ui } = this.context.store;
    const { router } = this.context;
    const childrenProp = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { router: router });
    });

    return  (
      <div>
        <MatchMediaProvider breakpoints={ui.breakpoints} updateScreenWidth={this.updateScreenWidth}>
          { this.getMobxDevTool() }
          {/*<F4WithNavContainer
            appContext={ClientConfig.context}
            logout={this.logout}
            user={auth.sessionUser}
            menuData={ui.sideDrawer.menuData}
            isFetching={ui.sideDrawer.isFetching}
            handleBurgerIconClick={() => { ui.navbar.toggleSideDrawer() }}
            isDrawerOpen={ui.navbar.sideDrawerIsOpen}
            screenWidth={ui.screenWidth}
            uiStore={ui}
            >
            { childrenProp }
          </F4WithNavContainer> */}
          {/*<F4BaseContainer
            appContext={ClientConfig.context}
            uiStore={ui}
            >
            { childrenProp }
          </F4BaseContainer>*/}
          {/*<F4WithNavContainer
            appContext={ClientConfig.context}
            logout={this.logout}
            user={auth.sessionUser}
            menuData={ui.sideDrawer.menuData}
            isFetching={ui.sideDrawer.isFetching}
            handleBurgerIconClick={() => { ui.navbar.toggleSideDrawer() }}
            isDrawerOpen={ui.navbar.sideDrawerIsOpen}
            screenWidth={ui.screenWidth}
            uiStore={ui}
            >
            { childrenProp }
          </F4WithNavContainer>*/}
          <MuiThemeProvider muiTheme={getMuiTheme(F4Theme.rbcTheme)}>
            <div>
              <F4MuiHeader
                logoutClick={this.logout}
                drawerClick={this._handleDrawer}
                drawerOpen={this.state.open}
                drawerChange={(open) => this.setState({open})}
                menuData={ui.sideDrawer.menuData}
                quickLinkClick={() => console.log('quick link')}
                dashBoardClick={() => window.location.href = '/dashboard'}
                imageLogo={'/' + ClientConfig.context + '/images/base_logo.png'}
              >
                  {
                    ui.sideDrawer.menuData.map((data, index) =>
                          <div className="nav-item-wrapper" key={data.id}>
                            <MenuItem style={ (data.id === this.state.newChildOpen && data.children !== null) ? {color: F4Theme.baseTheme.palette.primary1Color} : {color: F4Theme.baseTheme.palette.textColor} } onClick={this._handleAccordion.bind(this, data.id)} rightIcon={<FontIcon name={(data.id === this.state.newChildOpen && data.children !== null) ? 'angle-down' : (data.children !== null) ? 'angle-right' : '' }></FontIcon>}>
                              <p className="nav-item-text">{ data.name }</p>
                            </MenuItem>
                            <div>
                              { data.children && data.children.length > 0 &&
                                 <Collapse key={data.id} className="nav-item-children" isOpened={(data.id === this.state.newChildOpen) ? true : false}>
                                      {
                                        data.children.map((child, index) => {
                                          return (
                                            <MenuItem key={child.id} onClick={() => window.location.href = child.url}>
                                              <p className="nav-item-text">{ child.name }</p>
                                            </MenuItem>
                                          )
                                        })
                                      }
                                </Collapse>
                              }
                            </div>
                          </div>
                    )
                  }
              </F4MuiHeader>
              <Scrollbars style={{ width: '100%', height: '100vh'}}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                universal={true}
               >
              { childrenProp }
              </Scrollbars>
            </div>
          </MuiThemeProvider>
        </MatchMediaProvider>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  routeParams: React.PropTypes.object,
  route: React.PropTypes.object,
  routes: React.PropTypes.array,
};
