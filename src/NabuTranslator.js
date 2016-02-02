'use strict';
import React, {Component, PropTypes}  from 'react';
import { connect } from 'react-redux';


import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Toggle from 'material-ui/lib/toggle';

import NabuTable from './NabuTable.js';

//THEME
import theme from './nabu-theme.js';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

@ThemeDecorator(ThemeManager.getMuiTheme (theme))
@connect (
  state => ({
    translator: state.nabu.get ('translator'),
    marker: state.nabu.get ('marker'),
    locale: state.nabu.get ('locale')
  }), null, null, {pure: true})
class NabuTranslator extends Component {
  render () {
    const {dispatch, locale, translator, marker, store} = this.props;
    const setLocale = (e, index, value) => dispatch ({type: 'NABU_CHANGE_LOCALE',locale: value});
    const save = () => dispatch ({type: 'NABU_SAVE'});
    const toggleMarks = () => dispatch ({type: 'NABU_TOGGLE_MARKS'});
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float="left">
            <Toggle
              label="Marker"
              onToggle={toggleMarks}
              toggled={marker}
            />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <ToolbarTitle text="Locale" />
            <DropDownMenu  value={locale} onChange={setLocale} >
              <MenuItem value={'en_US'} primaryText='en_US' />
              <MenuItem value={'fr_CH'} primaryText='fr_CH' />
              <MenuItem value={'de_CH'} primaryText='de_CH' />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
        <NabuTable />
      </div>
    )
  }
}

module.exports = NabuTranslator;
