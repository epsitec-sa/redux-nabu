'use strict';

const curry = require ('ramda').curry;
const merge = require ('ramda').merge;

import MessageFormat                 from 'messageformat';

// Base action creator
const createCommand = command => ({type: command});
const setPayload    = (action, payload) => merge (action, payload);

const createAction = curry ((command, payload) => setPayload (createCommand (command), payload));

// Nabu actions
const changeSelectedLocale = l => createAction ('NABU_CHANGE_SELECTED_LOCALE', {
  locale: l
});

const addLocale = (l) => createAction ('NABU_ADD_LOCALE', {
  locale: l
});

const translate = (l, m, v) => createAction ('NABU_TRANSLATE', {
  locale:      l,
  messageId:   m,
  value:       v
});

const addMessage = (m, d) => createAction ('NABU_ADD_MESSAGE', {
  messageId:   m,
  description: d
});

const setMessage = (m, l, d, t) => createAction ('NABU_SET_MESSAGE', {
  messageId:   m,
  locale:      l,
  description: d,
  translation: t
});

const toggleMarker = () => createAction ('NABU_TOGGLE_MARKS', {});
const toggleTranslatorPanel = () => createAction ('NABU_TOGGLE_TRANSLATOR', {});

const setFocus = (m, v) => createAction ('NABU_SET_FOCUS', {
  messageId: m,
  value:     v
});

const toggleSelectionMode = () => createAction ('NABU_TOGGLE_SELECTION_MODE', {});

const setSelectedItem = (m) => createAction ('NABU_SET_SELECTED_ITEM', {
  messageId: m
});

const mustTranslate = (locale, messages, msgid) => {
  const mustTranslate = !messages.has (msgid);

  if (mustTranslate) {
    return true;
  }

  return !messages.getIn ([msgid, 'translations', locale]);
};

const T = (store) => {
  return (msgid, values, desc) => {
    const state = store.getState ();

    const locale = state.nabu.get ('selectedLocale');
    const messages = state.nabu.get ('messages');

    store.dispatch (setMessage (msgid, null, desc, null));

    const marker = state.nabu.get ('marker');
    const markerOn = marker && mustTranslate (locale, messages, msgid);

    const msg = messages.getIn ([msgid, 'translations', locale, 'message'], msgid);
    const formatter = new MessageFormat (locale).compile (msg);

    let text = formatter (values);
    if (markerOn) {
      text = '#' + text + '#';
    }
    return text;
  };
};

// API
module.exports = {
  initialState: require ('./initial-state.js'),
  nabuReducer:  require ('./reducer.js'),

  addLocale,
  changeSelectedLocale,

  translate,
  addMessage,
  setMessage,

  toggleMarker,
  toggleTranslatorPanel,
  setFocus,

  setSelectedItem,
  toggleSelectionMode,

  T
};
