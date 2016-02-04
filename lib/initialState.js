'use strict';

var _require = require('immutable');

var Map = _require.Map;
var Set = _require.Set;
var fromJS = _require.fromJS;

var state = fromJS({
  locale: 'en_US',
  nabuGen: 0,
  marker: false,
  translator: fromJS({
    isOpen: false,
    tableSize: 0
  }),
  en_US: fromJS({}),
  fr_CH: fromJS({}),
  de_CH: fromJS({})
});

module.exports = state;