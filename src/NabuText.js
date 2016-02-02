'use strict';
import React, {Component, PropTypes}  from 'react';
import {injectIntl} from 'react-intl';
import { connect } from 'react-redux';
import Badge from 'material-ui/lib/badge';


@connect (
  state => ({
    messages: state.nabu.get (state.nabu.get ('locale')),
    gen: state.nabu.get ('nabuGen'),
    marker: state.nabu.get ('marker')
  }), null, null, {pure: true})
class NabuText extends Component {

  static propTypes = {
    msgid: PropTypes.string.isRequired,
    desc: PropTypes.string
  };

  mustTranslate (messages, msgid) {
    const mustTranslate = !messages.has (msgid);
    if (mustTranslate) {
      return mustTranslate;
    }
    return !messages.getIn ([msgid, 'translated']);
  }

  mustAdd (props) {
    const { messages, msgid, desc, dispatch } = props;
    const mustAdd = !messages.has (msgid);
    if (mustAdd) {
      console.log ('NABU_ADD_MESSAGE:', msgid);
      dispatch ({
        type: 'NABU_ADD_MESSAGE',
        messageId: msgid,
        description: desc
      });
    }
  }

  showInTools (props) {
    const { messages, msgid, dispatch } = props;
    const canShow = !messages.has (msgid);
    if (canShow) {
      console.log ('NABU_ADD_IN_TABLE:', msgid);
      dispatch ({
        type: 'NABU_ADD_IN_TABLE',
        messageId: msgid
      });
    }
  }

  componentWillUpdate  (nextProps) {
    this.mustAdd (nextProps);
    this.showInTools (nextProps);
  }

  componentDidMount () {
    this.mustAdd (this.props);
    this.showInTools (this.props);
  }

  render() {
    const {
      marker,
      intl: {
        formatMessage,
        formatHTMLMessage
      },
      children,
      messages,
      msgid,
      desc,
      html,
      values
    } = this.props;

    const fallbackMessage = {
        id: msgid,
        defaultMessage: msgid,
        description: desc
    };

    const text = html ?
      formatHTMLMessage (messages.get (msgid, fallbackMessage), values)
      : formatMessage (messages.get (msgid, fallbackMessage), values);
    const markerOn = this.mustTranslate (messages, msgid) && marker;
    const highliteStyle = {
      backgroundColor: 'rgba(10,200,100, .5)'
    }

    return (
      <span style={markerOn ? highliteStyle : null} dangerouslySetInnerHTML={{__html:text}} >
        {children}
      </span>
    )
  }
}

module.exports = injectIntl (NabuText);
