'use strict';

const {fromJS} = require ('immutable');

const DEFAULT_LOCALE = 'en-US';

const state = fromJS ({
  selectedLocale:  DEFAULT_LOCALE,
  locales: [],

  nabuGen: 0,
  marker:  false,
  focus:   null,

  selectionMode: {
    enabled: false,
    selectedItemId: null,
  },

  translator: {
    isOpen: false,
    tableSize: 0
  },

  messages: {}
});

module.exports = state;


/*
Message is of type:

[id]: {
  defaultMessage: [id],
  description: '',
  translations: {
    [locale1]: {
      message: ''
    }
  }
}




*/
