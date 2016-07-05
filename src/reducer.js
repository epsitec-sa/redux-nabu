'use strict';

const {fromJS} = require ('immutable');

const initialNabu = require ('./initial-state.js');

function nabuReducer (state = initialNabu, action = {}) {
  switch (action.type) {
    case 'NABU_CHANGE_LOCALE': {
      return state.set ('locale', action.locale);
    }

    case 'NABU_TRANSLATE': {
      if (!state.hasIn (['translations', action.locale, action.messageId])) {
        return state;
      }

      const newGen = state.get ('nabuGen') + 1;
      const message = state.getIn (['translations', action.locale, action.messageId]);
      const newMessage = message.withMutations (map => {
        map.set ('defaultMessage', action.value).set ('translated', !!action.value);
      });

      return state
        .setIn (['translations', action.locale, action.messageId], newMessage)
        .set ('nabuGen', newGen);
    }

    case 'NABU_TOGGLE_MARKS': {
      const newState = !state.get ('marker');
      return state.set ('marker', newState);
    }

    case 'NABU_TOGGLE_TRANSLATOR': {
      const newState = !state.getIn (['translator', 'isOpen']);
      return state.setIn (['translator', 'isOpen'], newState);
    }

    case 'NABU_ADD_LOCALE': {
      const defLocale = state.get ('defaultLocale');
      const def = state.getIn (['translations', defLocale]);
      return state.setIn (['translations', action.locale], def);
    }

    case 'NABU_ADD_MESSAGE': {
      const defLocale = state.get ('defaultLocale');
      let size = state.getIn (['translations', defLocale]).size;
      if (!state.hasIn (['translations', defLocale, action.messageId])) {
        size++;
      }
      let newState = state.get ('translations');
      newState.keySeq ().forEach ((locale) => {
        newState = newState.setIn ([locale, action.messageId], fromJS ({
          id:             action.messageId,
          defaultMessage: action.messageId,
          default:        action.messageId,
          description:    action.description,
          translated:     false
        }));
      });
      return state
        .set ('translations', newState)
        .setIn (['translator','tableSize'], size);
    }
  }
  return state;
}

module.exports = nabuReducer;
