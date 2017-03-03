/**
* {{ properCase name }}.js
*/

import React, { Component, PropTypes } from 'react';

{{#if baseComponentImports}}
import { BaseComponents } from 'frontend-react-f4-base-ui';

const {
{{#each baseComponentImports}}
  {{#if @last}}
  {{this}}
  {{else}}
  {{this}},
  {{/if}}
{{/each}}
} = BaseComponents;
{{/if}}


export default class {{ properCase name }} extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
        <p>Change my content</p>
      </div>
    );
  }
}

{{ properCase name }}.propTypes = {
  // props definition
}

{{ properCase name }}.defaultProps = {
  // default props
}
