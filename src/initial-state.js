'use strict';

const {fromJS} = require ('immutable');

const state = fromJS ({
  locale:  'en-US',
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
