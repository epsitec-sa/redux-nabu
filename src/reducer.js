'use strict';

const {fromJS} = require ('immutable');

const initialNabu = require ('./initialState.js');

function nabuReducer (state = initialNabu, action = {}) {
  switch (action.type) {
  case 'NABU_CHANGE_LOCALE': {
    return state.set ('locale', action.locale);
  }

  case 'NABU_TRANSLATE': {
    let newGen = state.get ('nabuGen');
    newGen++;
    let message = state.getIn ([action.locale, action.messageId]);
    message.defaultMessage = action.value;
    message.translated = !!action.value;
    return state
      .setIn ([action.locale, action.messageId], message)
      .set ('nabuGen', newGen);
  }

  case 'NABU_TOGGLE_MARKS': {
    let newState = !state.get ('marker');
    return state.set ('marker', newState);
  }

  case 'NABU_TOGGLE_TRANSLATOR': {
    let newState = !state.getIn (['translator','isOpen']);
    return state.setIn (['translator','isOpen'], newState);
  }

  case 'NABU_ADD_MESSAGE': {
    return state
      .setIn (['en_US', action.messageId], {
        id:             action.messageId,
        defaultMessage: action.messageId,
        description:    action.description,
        translated:     false
      })
      .setIn (['fr_CH', action.messageId], {
        id:             action.messageId,
        defaultMessage: action.messageId,
        description:    action.description,
        translated:     false
      })
      .setIn (['de_CH', action.messageId], {
        id:             action.messageId,
        defaultMessage: action.messageId,
        description:    action.description,
        translated:     false
      });
  }
  }
  return state;
}

module.exports = nabuReducer;
