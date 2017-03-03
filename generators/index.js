'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.red('react-pob-generator') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your Project Name',
      default: "react-pob-fundtransfer"
    },{
      type: 'input',
      name: 'APP_CONTEXT',
      message: 'Your APP_CONTEXT Name',
      default: 'fundtransfer'
    },{
      type: 'input',
      name: 'PORT',
      message: 'Your PORT Name',
      default: 3000
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      console.log(this.props);
    }.bind(this));
  },
  writing: function () {
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationPath(this.props.name),
      {name: this.props.name, APP_CONTEXT: this.props.APP_CONTEXT, PORT: this.props.PORT}
    );
    this.fs.copyTpl(
      this.templatePath('.env-dev'),
      this.destinationPath(this.props.name + '/.env-dev'),
      {name: this.props.name, APP_CONTEXT: this.props.APP_CONTEXT, PORT: this.props.PORT}
    );
    this.fs.copyTpl(
      this.templatePath('.env-prod'),
      this.destinationPath(this.props.name + '/.env-prod'),
      {name: this.props.name, APP_CONTEXT: this.props.APP_CONTEXT, PORT: this.props.PORT}
    );
    this.fs.copyTpl(
      this.templatePath('webpack-envs/development.js'),
      this.destinationPath(this.props.name + '/webpack-envs/development.js'),
      {name: this.props.name, APP_CONTEXT: this.props.APP_CONTEXT, PORT: this.props.PORT}
    );
    this.fs.copyTpl(
      this.templatePath('webpack-envs/production.js'),
      this.destinationPath(this.props.name + '/webpack-envs/production.js'),
      {name: this.props.name, APP_CONTEXT: this.props.APP_CONTEXT, PORT: this.props.PORT}
    );
  }
});
