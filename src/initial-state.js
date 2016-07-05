'use strict';

const {Map, Set, fromJS} = require ('immutable');

const state = fromJS ({
  locale:  'en_US',
  nabuGen: 0,
  marker:  false,
  translator: fromJS ({
    isOpen: false,
    tableSize: 0
  }),
  en_US: fromJS ({}),
  fr_CH: fromJS ({}),
  de_CH: fromJS ({})
});

module.exports = state;
