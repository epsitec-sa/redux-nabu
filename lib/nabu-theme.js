'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('material-ui/lib/styles/colors');

var _colors2 = _interopRequireDefault(_colors);

var _colorManipulator = require('material-ui/lib/utils/color-manipulator');

var _colorManipulator2 = _interopRequireDefault(_colorManipulator);

var _spacing = require('material-ui/lib/styles/spacing');

var _spacing2 = _interopRequireDefault(_spacing);

var _zIndex = require('material-ui/lib/styles/zIndex');

var _zIndex2 = _interopRequireDefault(_zIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nabuTheme = {
  spacing: _spacing2.default,
  zIndex: _zIndex2.default,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: _colors2.default.cyan500,
    primary2Color: _colors2.default.cyan700,
    primary3Color: _colors2.default.lightBlack,
    accent1Color: _colors2.default.pinkA200,
    accent2Color: _colors2.default.grey100,
    accent3Color: _colors2.default.grey500,
    textColor: _colors2.default.darkBlack,
    alternateTextColor: _colors2.default.white,
    canvasColor: _colors2.default.white,
    borderColor: _colors2.default.grey300,
    disabledColor: _colorManipulator2.default.fade(_colors2.default.darkBlack, 0.3),
    pickerHeaderColor: _colors2.default.cyan500
  }
};

exports.default = nabuTheme;