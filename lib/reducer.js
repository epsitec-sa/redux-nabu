'use strict';

var _require = require('immutable');

var fromJS = _require.fromJS;

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
        console.dir(message);
        var newMessage = message.withMutations(function (map) {
          map.set('defaultMessage', action.value).set('translated', !!action.value);
        });
        return state.setIn([action.locale, action.messageId], newMessage).set('nabuGen', newGen);
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

    case 'NABU_ADD_MESSAGE':
      {
        var size = state.getIn(['en_US']).size;
        if (!state.hasIn(['en_US', action.messageId])) {
          size++;
        }
        return state.setIn(['en_US', action.messageId], fromJS({
          id: action.messageId,
          defaultMessage: action.messageId,
          description: action.description,
          translated: false
        })).setIn(['fr_CH', action.messageId], fromJS({
          id: action.messageId,
          defaultMessage: action.messageId,
          description: action.description,
          translated: false
        })).setIn(['de_CH', action.messageId], fromJS({
          id: action.messageId,
          defaultMessage: action.messageId,
          description: action.description,
          translated: false
        })).setIn(['translator', 'tableSize'], size);
      }
  }
  return state;
}

module.exports = nabuReducer;