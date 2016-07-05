'use strict';

const curry = require ('ramda').curry;
const merge = require ('ramda').merge;

if (!global.Intl) {
  require ('intl');
}

const IntlMessageFormat = require ('intl-messageformat');

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

const mustTranslate = (messages, msgid) => {
  const mustTranslate = !messages.has (msgid);
  if (mustTranslate) {
    return mustTranslate;
  }
  return !messages.getIn ([msgid, 'translated']);
};

// API
module.exports = {
  changeLocale:          changeLocale,
  translate:             translate,
  addMessage:            addMessage,
  toggleMarker:          toggleMarker,
  toggleTranslatorPanel: toggleTranslatorPanel,
  initialState:          require ('./initialState.js'),
  nabuReducer:           require ('./reducer.js'),
  T: (store) => {
    return (msgid, values, desc) => {
      const state = store.getState ();
      const messages = state.nabu.get (state.nabu.get ('locale'));
      const mustAdd = !messages.has (msgid);
      if (mustAdd) {
        console.log ('NABU_ADD_MESSAGE:', msgid);
        store.dispatch (addMessage (msgid, desc));
      }
      const marker = state.nabu.get ('marker');
      const markerOn = mustTranslate (messages, msgid) && marker;
      const msg = messages.getIn ([msgid, 'defaultMessage'], msgid);
      const message = new IntlMessageFormat (msg, state.nabu.get ('locale'));
      let text = message.format (values);
      if (markerOn) {
        text = '#' + text + '#';
      }
      return text;
    };
  }
};
