'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _tableRow = require('material-ui/lib/table/table-row');

var _tableRow2 = _interopRequireDefault(_tableRow);

var _tableRowColumn = require('material-ui/lib/table/table-row-column');

var _tableRowColumn2 = _interopRequireDefault(_tableRowColumn);

var _textField = require('material-ui/lib/text-field');

var _textField2 = _interopRequireDefault(_textField);

var _checkbox = require('material-ui/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NabuTranslator = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    locale: state.nabu.get('locale'),
    gen: state.nabu.get('nabuGen')
  };
}, null, null, { pure: true }), _dec(_class = function (_Component) {
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
      var msg = _props.msg;

      var translate = function translate(id, value) {
        dispatch({ type: 'NABU_TRANSLATE', locale: locale, messageId: id, value: value });
      };

      return _react2.default.createElement(
        _tableRow2.default,
        null,
        _react2.default.createElement(
          _tableRowColumn2.default,
          { columnNumber: 1 },
          _react2.default.createElement(
            'span',
            null,
            msg.id
          ),
          _react2.default.createElement(
            'span',
            { style: { margin: '15px' } },
            '(',
            msg.description || '-',
            ')'
          )
        ),
        _react2.default.createElement(
          _tableRowColumn2.default,
          { columnNumber: 2, style: { minWidth: '200px' } },
          _react2.default.createElement(_textField2.default, {
            value: msg.defaultMessage,
            multiLine: true,
            rows: 1,
            rowsMax: 4,
            onChange: function onChange(e) {
              return translate(msg.id, e.target.value);
            }
          })
        ),
        _react2.default.createElement(
          _tableRowColumn2.default,
          null,
          _react2.default.createElement(_checkbox2.default, {
            defaultChecked: msg.translated,
            disabled: true
          })
        )
      );
    }
  }]);

  return NabuTranslator;
}(_react.Component)) || _class);
exports.default = NabuTranslator;