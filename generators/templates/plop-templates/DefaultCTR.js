/**
* {{ properCase routeContainer }}CTR.js
*/

import React, {Component, PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Helmet from 'react-helmet';
import { BaseContainers, BaseComponents } from 'frontend-react-f4-base-ui';
import { BaseContext } from 'frontend-react-f4-base-commons';

const { connect } = BaseContext;
const  { F4ContentContainer } = BaseContainers;
const {
  F4Card,
  F4Toolbar,
  F4ToolbarElement,
} = BaseComponents;

import ClientConfig from '../../config/ClientConfig';


@connect
export default class {{ properCase routeContainer }}CTR extends Component {
  constructor(props) {
    super(props);

  }
  handleSettingsClick() {
    alert('Settings clicked');
  }
  handleViewClick() {

    alert('View clicked');
  }
  render() {

    const { auth, ui } = this.context.store;

    return (
      <F4ContentContainer>
        {/* top toolbar */}
        <Helmet title="TITLE HERE"/>
        <F4Toolbar title={ "PAGE TITLE HERE" }>
          <F4ToolbarElement icon={"eye"} iconSize={18} text={"View"} onClick={this.handleViewClick} />
          <F4ToolbarElement icon={"cog"} iconSize={18} text={"Settings"} onClick={this.handleSettingsClick} />
        </F4Toolbar>
        {/* content */}
        <h1>CONTENT HERE</h1>
      </F4ContentContainer>
    );
  }
}
