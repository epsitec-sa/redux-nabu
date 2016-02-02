'use strict';

var curry = require('ramda').curry;
var merge = require('ramda').merge;

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

// API
module.exports = {
  changeLocale: changeLocale,
  translate: translate,
  addMessage: addMessage,
  toggleMarker: toggleMarker,
  toggleTranslatorPanel: toggleTranslatorPanel,
  nabuReducer: require('./reducer.js'),
  NabuTranslator: require('./NabuTranslator.js'),
  NabuTranslatorPanel: require('./NabuTranslatorPanel.js'),
  NabuText: require('./NabuText.js')
};