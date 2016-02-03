'use strict';

const curry = require ('ramda').curry;
const merge = require ('ramda').merge;

// Base action creator
const createCommand = command => ({type: command});
const setPayload    = (action, payload) => merge (action, payload);

const createAction = curry ((command, payload) => setPayload (createCommand (command), payload));

// Nabu actions
const changeLocale = l => createAction ('NABU_CHANGE_LOCALE', {
  locale: l
});

const translate = (l, m, v) => createAction ('NABU_TRANSLATE', {
  locale:    l,
  messageId: m,
  value:     v
});

const addMessage = (m, d) => createAction ('NABU_ADD_MESSAGE', {
  messageId:   m,
  description: d
});

const toggleMarker = () => createAction ('NABU_TOGGLE_MARKS', {});
const toggleTranslatorPanel = () => createAction ('NABU_TOGGLE_TRANSLATOR', {});

// API
module.exports = {
  changeLocale:          changeLocale,
  translate:             translate,
  addMessage:            addMessage,
  toggleMarker:          toggleMarker,
  toggleTranslatorPanel: toggleTranslatorPanel,
  initialState:          require ('./initialState.js'),
  nabuReducer:           require ('./reducer.js')
};
