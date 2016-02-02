'use strict';

var _require = require('immutable');

var Map = _require.Map;
var Set = _require.Set;
var fromJS = _require.fromJS;

var state = Map(fromJS({
  locale: 'en_US',
  nabuGen: 0,
  marker: false,
  translator: Map(fromJS({
    isOpen: false,
    table: Set()
  })),
  en_US: Map(fromJS({})),
  fr_CH: Map(fromJS({})),
  de_CH: Map(fromJS({}))
}));

module.exports = state;