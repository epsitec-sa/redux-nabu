'use strict';

var _require = require('immutable');

var Map = _require.Map;
var Set = _require.Set;
var fromJS = _require.fromJS;

var initialIntl = Map(fromJS({
  locale: 'en_US',
  nabuGen: 0,
  marker: false,
  translator: Map(fromJS({
    isOpen: false,
    table: Set()
  })),
  en_US: Map(fromJS({})),
  fr_CH: Map(fromJS({})),
  de_CH: Map(fromJS({}))
}));

function nabuReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialIntl : arguments[0];
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
        if (action.value) {
          message.translated = true;
        } else {
          message.translated = false;
        }
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