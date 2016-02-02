'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

//THEME

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _toolbar = require('material-ui/lib/toolbar/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _toolbarGroup = require('material-ui/lib/toolbar/toolbar-group');

var _toolbarGroup2 = _interopRequireDefault(_toolbarGroup);

var _toolbarTitle = require('material-ui/lib/toolbar/toolbar-title');

var _toolbarTitle2 = _interopRequireDefault(_toolbarTitle);

var _DropDownMenu = require('material-ui/lib/DropDownMenu');

var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

var _menuItem = require('material-ui/lib/menus/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _toggle = require('material-ui/lib/toggle');

var _toggle2 = _interopRequireDefault(_toggle);

var _NabuTable = require('./NabuTable.js');

var _NabuTable2 = _interopRequireDefault(_NabuTable);

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

var NabuTranslator = (_dec = (0, _themeDecorator2.default)(_themeManager2.default.getMuiTheme(_nabuTheme2.default)), _dec2 = (0, _reactRedux.connect)(function (state) {
  return {
    translator: state.nabu.get('translator'),
    marker: state.nabu.get('marker'),
    locale: state.nabu.get('locale')
  };
}, null, null, { pure: true }), _dec(_class = _dec2(_class = function (_Component) {
  _inherits(NabuTranslator, _Component);

  function NabuTranslator() {
    _classCallCheck(this, NabuTranslator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NabuTranslator).apply(this, arguments));
  }

  _createClass(NabuTranslator, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var dispatch = _props.dispatch;
      var locale = _props.locale;
      var translator = _props.translator;
      var marker = _props.marker;
      var store = _props.store;

      var setLocale = function setLocale(e, index, value) {
        return dispatch({ type: 'NABU_CHANGE_LOCALE', locale: value });
      };
      var save = function save() {
        return dispatch({ type: 'NABU_SAVE' });
      };
      var toggleMarks = function toggleMarks() {
        return dispatch({ type: 'NABU_TOGGLE_MARKS' });
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _toolbar2.default,
          null,
          _react2.default.createElement(
            _toolbarGroup2.default,
            { float: 'left' },
            _react2.default.createElement(_toggle2.default, {
              label: 'Marker',
              onToggle: toggleMarks,
              toggled: marker
            })
          ),
          _react2.default.createElement(
            _toolbarGroup2.default,
            { float: 'right' },
            _react2.default.createElement(_toolbarTitle2.default, { text: 'Locale' }),
            _react2.default.createElement(
              _DropDownMenu2.default,
              { value: locale, onChange: setLocale },
              _react2.default.createElement(_menuItem2.default, { value: 'en_US', primaryText: 'en_US' }),
              _react2.default.createElement(_menuItem2.default, { value: 'fr_CH', primaryText: 'fr_CH' }),
              _react2.default.createElement(_menuItem2.default, { value: 'de_CH', primaryText: 'de_CH' })
            )
          )
        ),
        _react2.default.createElement(_NabuTable2.default, null)
      );
    }
  }]);

  return NabuTranslator;
}(_react.Component)) || _class) || _class);

module.exports = NabuTranslator;