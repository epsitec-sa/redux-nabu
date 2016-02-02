'use strict';
import React, {Component, PropTypes}  from 'react';
import { connect } from 'react-redux';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableBody from 'material-ui/lib/table/table-body';

import NabuRow from './NabuRow.js';

@connect (
  state => ({
    table: state.nabu.getIn (['translator', 'table']),
    messages: state.nabu.get (state.nabu.get ('locale'))
  }), null, null, {pure: true})
export default class NabuTranslator extends Component {
  render () {
    const {dispatch, messages, table} = this.props;

    return (
        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn columnNumber={1}>ID</TableHeaderColumn>
              <TableHeaderColumn columnNumber={2}>Translation</TableHeaderColumn>
              <TableHeaderColumn columnNumber={3}>Translated</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody selectable={false} stripedRows={true}>
            {messages.toArray ().map ((msg, index) => {
              return (
                <NabuRow key={msg.id} msg={msg} />
              );
            })}
          </TableBody>
        </Table>
    )
  }
}
