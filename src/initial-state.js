'use strict';

const {fromJS} = require ('immutable');

const DEFAULT_LOCALE = 'en-US';

const state = fromJS ({
  defaultLocale: DEFAULT_LOCALE,
  locale:  DEFAULT_LOCALE,
  nabuGen: 0,
  marker:  false,
  translator: fromJS ({
    isOpen: false,
    tableSize: 0
  }),
  'en-US': fromJS ({}),
  'fr-CH': fromJS ({}),
  'de-CH': fromJS ({})
});

module.exports = state;
