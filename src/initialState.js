'use strict';

const {Map, Set, fromJS} = require ('immutable');

const state = Map (fromJS ({
  locale:  'en_US',
  nabuGen: 0,
  marker:  false,
  translator: Map (fromJS ({
    isOpen: false,
    table:  Set ()
  })),
  en_US: Map (fromJS ({})),
  fr_CH: Map (fromJS ({})),
  de_CH: Map (fromJS ({}))
}));

module.exports = state;
