'use strict';

var curry = require('ramda').curry;
var merge = require('ramda').merge;
var formatMessage = require('format-message');
// Base action creator
var createCommand = function createCommand(command) {
  return { type: command };
};
var setPayload = function setPayload(action, payload) {
  return merge(action, payload);
};

var createAction = curry(function (command, payload) {
  return setPayload(createCommand(command), payload);
});

// Nabu actions
var changeLocale = function changeLocale(l) {
  return createAction('NABU_CHANGE_LOCALE', {
    locale: l
  });
};

var translate = function translate(l, m, v) {
  return createAction('NABU_TRANSLATE', {
    locale: l,
    messageId: m,
    value: v
  });
};

var addMessage = function addMessage(m, d) {
  return createAction('NABU_ADD_MESSAGE', {
    messageId: m,
    description: d
  });
};

var toggleMarker = function toggleMarker() {
  return createAction('NABU_TOGGLE_MARKS', {});
};
var toggleTranslatorPanel = function toggleTranslatorPanel() {
  return createAction('NABU_TOGGLE_TRANSLATOR', {});
};

var mustTranslate = function mustTranslate(messages, msgid) {
  var mustTranslate = !messages.has(msgid);
  if (mustTranslate) {
    return mustTranslate;
  }
  return !messages.getIn([msgid, 'translated']);
};
// API
module.exports = {
  changeLocale: changeLocale,
  translate: translate,
  addMessage: addMessage,
  toggleMarker: toggleMarker,
  toggleTranslatorPanel: toggleTranslatorPanel,
  initialState: require('./initialState.js'),
  nabuReducer: require('./reducer.js'),
  T: function T(store) {
    return function (msgid, values, desc) {
      var state = store.getState();
      var messages = state.nabu.get(state.nabu.get('locale'));
      var mustAdd = !messages.has(msgid);
      if (mustAdd) {
        console.log('NABU_ADD_MESSAGE:', msgid);
        store.dispatch(addMessage(msgid, desc));
      }
      var marker = state.nabu.get('marker');
      var fallbackMessage = {
        id: msgid,
        default: msgid,
        description: desc
      };
      var markerOn = mustTranslate(messages, msgid) && marker;
      var text = formatMessage(messages.get(msgid, fallbackMessage), values, state.nabu.get('locale'));
      if (markerOn) {
        text = '#' + text + '#';
      }
      return text;
    };
  }
};