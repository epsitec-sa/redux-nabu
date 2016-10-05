'use strict';

const {fromJS} = require ('immutable');

const DEFAULT_LOCALE = 'en-US';

const state = fromJS ({
  defaultLocale: DEFAULT_LOCALE,
  locale:  DEFAULT_LOCALE,
  nabuGen: 0,
  marker:  false,
  focus:   null,
  selectionMode: {
    enabled: false,
    selectedItemId: null,
  },
  translator: fromJS ({
    isOpen: false,
    tableSize: 0
  }),
  translations: fromJS ({
    [DEFAULT_LOCALE]: fromJS ({}),
  })
});

module.exports = state;
