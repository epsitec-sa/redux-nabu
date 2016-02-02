'use strict';
import { IntlProvider } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin ();

const curry = require ('ramda').curry;
const merge = require ('ramda').merge;

// Base action creator
const createCommand = (command) => ({type: command});
const setPayload = (action, payload) => merge (action, payload);

const createAction = curry (
  (command, payload) => setPayload (createCommand (command), payload)
);


// Nabu actions
const changeLocale = (l) => createAction('NABU_CHANGE_LOCALE', {
  locale: l
});

const translate = (l, m, v) => createAction ('NABU_TRANSLATE', {
  locale: l,
  messageId: m,
  value: v
});

const addMessage = (m, d) => createAction ('NABU_ADD_MESSAGE', {
  messageId: m,
  description: d
});

const toggleMarker = () => createAction ('NABU_TOGGLE_MARKS', {});
const toggleTranslatorPanel = () => createAction ('NABU_TOGGLE_TRANSLATOR', {});

// API
module.exports = {
  changeLocale: changeLocale,
  translate: translate,
  addMessage: addMessage,
  toggleMarker: toggleMarker,
  toggleTranslatorPanel: toggleTranslatorPanel,
  nabuReducer: require ('./reducer.js'),
  NabuTranslator: require ('./NabuTranslator.js'),
  NabuTranslatorPanel: require ('./NabuTranslatorPanel.js'),
  NabuText: require ('./NabuText.js'),
  NabuProvide: IntlProvider,
  initialState: require ('./initialState')
};
