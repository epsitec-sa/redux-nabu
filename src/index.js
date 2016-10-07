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
const changeSelectedLocale = l => createAction ('NABU_CHANGE_SELECTED_LOCALE', {
  locale: l
});

const addLocale = (l) => createAction ('NABU_ADD_LOCALE', {
  locale: l
});




const addMessage = (m, d) => createAction ('NABU_ADD_MESSAGE', {
  messageId:   m,
  description: d
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

const setFocus = (m, v) => createAction ('NABU_SET_FOCUS', {
  messageId: m,
  value:     v
});



const toggleSelectionMode = () => createAction ('NABU_TOGGLE_SELECTION_MODE', {});

const setSelectedItem = (m) => createAction ('NABU_SET_SELECTED_ITEM', {
  messageId: m
});



const mustTranslate = (messages, msgid) => {
  const mustTranslate = !messages.has (msgid);
  if (mustTranslate) {
    return mustTranslate;
  }
  return !messages.getIn ([msgid, 'translated']);
};

const T = (store) => {
  return (msgid, values, desc) => {
    const state = store.getState ();
    const messages = state.nabu.getIn (['translations', state.nabu.get ('locale')]);
    const mustAdd = !messages.has (msgid);
    if (mustAdd) {
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
};

// API
module.exports = {
  initialState: require ('./initial-state.js'),
  nabuReducer:  require ('./reducer.js'),

  addLocale,
  changeSelectedLocale,

  translate,
  addMessage,
  toggleMarker,
  toggleTranslatorPanel,
  setFocus,

  setSelectedItem,
  toggleSelectionMode,

  T
};
