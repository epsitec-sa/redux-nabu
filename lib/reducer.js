'use strict';

var initialNabu = require('./initialState.js');

function nabuReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialNabu : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  switch (action.type) {
    case 'NABU_CHANGE_LOCALE':
      {
        return state.set('locale', action.locale);
      }

    case 'NABU_TRANSLATE':
      {
        var newGen = state.get('nabuGen');
        newGen++;
        var message = state.getIn([action.locale, action.messageId]);
        message.defaultMessage = action.value;
        message.translated = !!action.value;
        return state.setIn([action.locale, action.messageId], message).set('nabuGen', newGen);
      }

    case 'NABU_TOGGLE_MARKS':
      {
        var newState = !state.get('marker');
        return state.set('marker', newState);
      }

    case 'NABU_TOGGLE_TRANSLATOR':
      {
        var newState = !state.getIn(['translator', 'isOpen']);
        return state.setIn(['translator', 'isOpen'], newState);
      }

    case 'NABU_ADD_IN_TABLE':
      {
        var table = state.getIn(['translator', 'table']);
        return state.setIn(['translator', 'table'], table.add(action.messageId));
      }

    case 'NABU_CLEAR_TABLE':
      {
        var table = state.getIn(['translator', 'table']);
        return state.setIn(['translator', 'table'], table.clear());
      }

    case 'NABU_ADD_MESSAGE':
      {
        return state.setIn(['en_US', action.messageId], {
          id: action.messageId,
          defaultMessage: action.messageId,
          description: action.description,
          translated: false
        }).setIn(['fr_CH', action.messageId], {
          id: action.messageId,
          defaultMessage: action.messageId,
          description: action.description,
          translated: false
        }).setIn(['de_CH', action.messageId], {
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