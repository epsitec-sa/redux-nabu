'use strict';
const { Map, Set, fromJS } = require ('immutable');

const initialIntl = Map (fromJS ({
  locale: 'en_US',
  nabuGen: 0,
  marker: false,
  translator: Map (fromJS ({
    isOpen: false,
    table: Set ()
  })),
  en_US: Map (fromJS ({})),
  fr_CH: Map (fromJS ({})),
  de_CH: Map (fromJS ({}))
}));


function nabuReducer (state = initialIntl, action = {}) {
  switch (action.type) {
    case 'NABU_CHANGE_LOCALE': {
      return state
              .set ('locale', action.locale);
    }
    case 'NABU_TRANSLATE': {
      let newGen = state.get ('nabuGen');
      newGen++;
      let message = state.getIn ([action.locale, action.messageId]);
      message.defaultMessage = action.value;
      if (action.value) {
        message.translated = true;
      } else {
        message.translated = false;
      }
      return state
              .setIn ([action.locale, action.messageId], message)
              .set ('nabuGen', newGen);
    }
    case 'NABU_TOGGLE_MARKS': {
      let newState = !state
                        .get ('marker');
      return state
              .set ('marker', newState);
    }
    case 'NABU_TOGGLE_TRANSLATOR': {
      let newState = !state
                        .getIn (['translator','isOpen']);
      return state
              .setIn (['translator','isOpen'], newState);
    }
    case 'NABU_ADD_IN_TABLE': {
      const table = state.getIn (['translator','table']);
      return state
              .setIn (['translator','table'], table.add (action.messageId));
    }
    case 'NABU_CLEAR_TABLE': {
      const table = state.getIn (['translator','table']);
      return state
              .setIn (['translator','table'], table.clear ());
    }
    case 'NABU_ADD_MESSAGE': {
      return state
        .setIn (['en_US', action.messageId], {
          id: action.messageId,
          defaultMessage: action.messageId,
          description: action.description,
          translated: false
        })
        .setIn (['fr_CH', action.messageId], {
          id: action.messageId,
          defaultMessage: action.messageId,
          description: action.description,
          translated: false
        })
        .setIn (['de_CH', action.messageId], {
          id: action.messageId,
          defaultMessage: action.messageId,
          description: action.description,
          translated: false
        });
    }
  }
  return state;
}

module.exports = nabuReducer;
