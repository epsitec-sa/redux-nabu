'use strict';
import React, {Component, PropTypes}  from 'react';
import { connect } from 'react-redux';

import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';

@connect (
  state => ({
    locale: state.nabu.get ('locale'),
    gen: state.nabu.get ('nabuGen')
  }), null, null, {pure: true})
export default class NabuTranslator extends Component {
  render () {
    const {dispatch, locale, msg} = this.props;

    const translate = (id, value) => {
      dispatch ({type: 'NABU_TRANSLATE',locale: locale, messageId: id, value: value});
    };

    return (
      <TableRow>
        <TableRowColumn columnNumber={1}>
          <span>{msg.id}</span><span style={{margin: '15px'}}>({msg.description || '-'})</span>
        </TableRowColumn>
        <TableRowColumn columnNumber={2} style={{minWidth: '200px'}}>
          <TextField
            value={msg.defaultMessage}
            multiLine={true}
            rows={1}
            rowsMax={4}
            onChange={(e) => translate (msg.id, e.target.value)}
          />

        </TableRowColumn>
        <TableRowColumn>
          <Checkbox
            defaultChecked={msg.translated}
            disabled={true}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
}
