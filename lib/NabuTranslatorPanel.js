'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

//THEME

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _leftNav = require('material-ui/lib/left-nav');

var _leftNav2 = _interopRequireDefault(_leftNav);

var _NabuTranslator = require('./NabuTranslator.js');

var _NabuTranslator2 = _interopRequireDefault(_NabuTranslator);

var _nabuTheme = require('./nabu-theme.js');

var _nabuTheme2 = _interopRequireDefault(_nabuTheme);

var _themeManager = require('material-ui/lib/styles/theme-manager');

var _themeManager2 = _interopRequireDefault(_themeManager);

var _themeDecorator = require('material-ui/lib/styles/theme-decorator');

var _themeDecorator2 = _interopRequireDefault(_themeDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NabuTranslatorPanel = (_dec = (0, _themeDecorator2.default)(_themeManager2.default.getMuiTheme(_nabuTheme2.default)), _dec2 = (0, _reactRedux.connect)(function (state) {
  return {
    open: state.nabu.getIn(['translator', 'isOpen'])
  };
}, null, null, { pure: true }), _dec(_class = _dec2(_class = function (_Component) {
  _inherits(NabuTranslatorPanel, _Component);

  function NabuTranslatorPanel() {
    _classCallCheck(this, NabuTranslatorPanel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NabuTranslatorPanel).apply(this, arguments));
  }

  _createClass(NabuTranslatorPanel, [{
    key: 'render',
    value: function render() {
      var open = this.props.open;

      var panelStyle = open ? { width: '100%', height: '30%' } : { width: '0px' };
      return _react2.default.createElement(
        _leftNav2.default,
        { open: open, style: panelStyle },
        _react2.default.createElement(_NabuTranslator2.default, null)
      );
    }
  }]);

  return NabuTranslatorPanel;
}(_react.Component)) || _class) || _class);

module.exports = NabuTranslatorPanel;