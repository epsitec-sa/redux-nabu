'use strict';

const {fromJS} = require ('immutable');

const initialNabu = require ('./initial-state.js');





function addNewMessage(state, messageId, description, locale, translation) {
  let size = state.get ('messages').size;
  size++;

  let newState = state.setIn (['messages', messageId], fromJS ({
      defaultMessage: messageId,
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


    case 'NABU_ADD_MESSAGE': {
      return setMessage (state, action.messageId, action.description, null, null);
    }

function nabuReducer (state = initialNabu, action = {}) {
  switch (action.type) {
    case 'NABU_ADD_LOCALE': {
      let newLocales = state.get ('images').add (action.locale);
      return state.set ('locales', newLocales);
    }

    case 'NABU_CHANGE_SELECTED_LOCALE': {
      return state.set ('selectedLocale', action.locale);
    }


      if (!state.hasIn (['translations', action.locale, action.messageId])) {
        newState = addMessage (state, action.messageId, '');
      }

      const newGen = newState.get ('nabuGen') + 1;
      const message = newState.getIn (['translations', action.locale, action.messageId]);
      const newMessage = message.withMutations (map => {
        map.set ('defaultMessage', action.value).set ('translated', !!action.value);
      });

      return newState
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
