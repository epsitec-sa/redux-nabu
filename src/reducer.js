'use strict';

const {fromJS} = require ('immutable');

const initialNabu = require ('./initial-state.js');


function addNewMessage(state, defLocale, messageId, description) {
  let size = state.getIn (['translations', defLocale]).size;
  size++;

  let newState = state.get ('translations');
  newState.keySeq ().forEach ((locale) => {
    newState = newState.setIn ([locale, messageId], fromJS ({
      id:             messageId,
      defaultMessage: messageId,
      default:        messageId,
      description:    description,
      translated:     false
    }));
  });
  return state
    .set ('translations', newState)
    .setIn (['translator','tableSize'], size);
}



function addExistingMessage(state, messageId, description) {
  let translationsState = state.get ('translations');
  let somethingChanged = false;

  translationsState.keySeq ().forEach ((locale) => {
    const message = translationsState.getIn ([locale, messageId]);

    const newMessage = message.withMutations (map => {
      if (map.get ('description') === '') {
        map.set ('description', description);
        somethingChanged = true;
      }
    });

    translationsState = translationsState.setIn ([locale, messageId], newMessage);
  });

  if (somethingChanged) {
    return state
      .set ('translations', translationsState);
  }
  else {
    return state;
  }
}



function addMessage(state, messageId, description) {
  const defLocale = state.get ('defaultLocale');

  if (!state.hasIn (['translations', defLocale, messageId])) {
    return addNewMessage (state, defLocale, messageId, description);
  }
  else {
    return addExistingMessage (state, messageId, description);
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
