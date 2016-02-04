'use strict';

const {Map, Set, fromJS} = require ('immutable');

const state = fromJS ({
  locale:  'en_US',
  nabuGen: 0,
  marker:  false,
  translator: fromJS ({
    isOpen: false,
    table:  Set ()
  }),
  en_US: fromJS ({}),
  fr_CH: fromJS ({}),
  de_CH: fromJS ({})
});

module.exports = state;
