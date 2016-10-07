'use strict';

const {fromJS} = require ('immutable');

const initialNabu = require ('./initial-state.js');





function addNewMessage(state, messageId, description, locale, translation) {
  let size = state.get ('messages').size;
  size++;

  let newState = state.setIn (['messages', messageId], fromJS ({
      description:    description
    }));

  if (locale && translation) {
    newState = newState.setIn (['messages', messageId, 'translations'], fromJS ({
      [locale]: {
        message:    translation
      }
    }));
  }

  return newState
    .setIn (['translator','tableSize'], size);
}



function setExistingMessage(state, messageId, description, locale, translation) {
  const message = state.getIn (['messages', messageId]);

  const newMessage = message.withMutations (map => {
    if (description) {
      map.set ('description', description);
    }

    if (locale && translation) {
      map.setIn (['translations', locale, 'message'], translation);
    }
  });

  return state.setIn (['messages', messageId], newMessage);
}



function setMessage(state, messageId, description, locale, translation) {
  if (!state.hasIn (['messages', messageId])) {
    return addNewMessage (state, messageId, description, locale, translation);
  }
  else {
    return setExistingMessage (state, messageId, description, locale, translation);
  }
}



function nabuReducer (state = initialNabu, action = {}) {
  switch (action.type) {
    case 'NABU_ADD_LOCALE': {
      const newLocales = state.get ('locales').push (action.locale);
      return state.set ('locales', newLocales);
    }

    case 'NABU_CHANGE_SELECTED_LOCALE': {
      return state.set ('selectedLocale', action.locale);
    }



    case 'NABU_ADD_MESSAGE': {
      return setMessage (state, action.messageId, action.description, null, null);
    }

    case 'NABU_TRANSLATE': {
      return setMessage (state, action.messageId, null, action.locale, action.translation);
    }

    case 'NABU_SET_MESSAGE': {
      return setMessage (state, action.messageId, action.description, action.locale, action.translation);
    }


    case 'NABU_TOGGLE_MARKS': {
      const newState = !state.get ('marker');
      return state.set ('marker', newState);
    }

    case 'NABU_TOGGLE_TRANSLATOR': {
      const newState = !state.getIn (['translator', 'isOpen']);
      return state.setIn (['translator', 'isOpen'], newState);
    }

    case 'NABU_SET_FOCUS': {
      return state.set ('focus', action.value ? action.messageId : null);
    }



    case 'NABU_SET_SELECTED_ITEM': {
      return state.setIn (['selectionMode', 'selectedItemId'], action.messageId);
    }

    case 'NABU_TOGGLE_SELECTION_MODE': {
      const newState = !state.getIn (['selectionMode', 'enabled']);
      return state.setIn (['selectionMode', 'enabled'], newState);
    }
  }
  return state;
}

module.exports = nabuReducer;
