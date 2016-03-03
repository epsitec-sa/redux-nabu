'use strict';

const {fromJS} = require ('immutable');

const initialNabu = require ('./initialState.js');

function nabuReducer (state = initialNabu, action = {}) {
  switch (action.type) {
  case 'NABU_CHANGE_LOCALE': {
    return state.set ('locale', action.locale);
  }

  case 'NABU_TRANSLATE': {
    const newGen = state.get ('nabuGen') + 1;
    const message = state.getIn ([action.locale, action.messageId]);
    const newMessage = message.withMutations (map => {
      map.set ('defaultMessage', action.value).set ('translated', !!action.value);
    });

    return state
      .setIn ([action.locale, action.messageId], newMessage)
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
    let size = state.getIn (['en_US']).size;
    if (!state.hasIn (['en_US', action.messageId])) {
      size++;
    }
    return state
      .setIn (['en_US', action.messageId], fromJS ({
        id:             action.messageId,
        defaultMessage: action.messageId,
        default:        action.messageId,
        description:    action.description,
        translated:     false
      }))
      .setIn (['fr_CH', action.messageId], fromJS ({
        id:             action.messageId,
        defaultMessage: action.messageId,
        default:        action.messageId,
        description:    action.description,
        translated:     false
      }))
      .setIn (['de_CH', action.messageId], fromJS ({
        id:             action.messageId,
        defaultMessage: action.messageId,
        default:        action.messageId,
        description:    action.description,
        translated:     false
      }))
      .setIn (['translator','tableSize'], size);
  }
  }
  return state;
}

module.exports = nabuReducer;
