'use strict';
import React, {Component, PropTypes}  from 'react';
import { connect } from 'react-redux';

import LeftNav from 'material-ui/lib/left-nav';

import NabuTranslator from './NabuTranslator.js';

//THEME
import theme from './nabu-theme.js';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

@ThemeDecorator(ThemeManager.getMuiTheme (theme))
@connect (
  state => ({
    open: state.nabu.getIn (['translator', 'isOpen'])
  }), null, null, {pure: true})
class NabuTranslatorPanel extends Component {

  render() {
    const {open} = this.props;
    const panelStyle= open ? {width: '100%', height:'30%'} : {width: '0px'};
    return (
      <LeftNav open={open} style={panelStyle}>
        <NabuTranslator />
      </LeftNav>
    )
  }
}

module.exports = NabuTranslatorPanel;
