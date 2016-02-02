'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _reactRedux = require('react-redux');

var _badge = require('material-ui/lib/badge');

var _badge2 = _interopRequireDefault(_badge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NabuText = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    messages: state.nabu.get(state.nabu.get('locale')),
    gen: state.nabu.get('nabuGen'),
    marker: state.nabu.get('marker')
  };
}, null, null, { pure: true }), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(NabuText, _Component);

  function NabuText() {
    _classCallCheck(this, NabuText);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NabuText).apply(this, arguments));
  }

  _createClass(NabuText, [{
    key: 'mustTranslate',
    value: function mustTranslate(messages, msgid) {
      var mustTranslate = !messages.has(msgid);
      if (mustTranslate) {
        return mustTranslate;
      }
      return !messages.getIn([msgid, 'translated']);
    }
  }, {
    key: 'mustAdd',
    value: function mustAdd(props) {
      var messages = props.messages;
      var msgid = props.msgid;
      var desc = props.desc;
      var dispatch = props.dispatch;

      var mustAdd = !messages.has(msgid);
      if (mustAdd) {
        console.log('NABU_ADD_MESSAGE:', msgid);
        dispatch({
          type: 'NABU_ADD_MESSAGE',
          messageId: msgid,
          description: desc
        });
      }
    }
  }, {
    key: 'showInTools',
    value: function showInTools(props) {
      var messages = props.messages;
      var msgid = props.msgid;
      var dispatch = props.dispatch;

      var canShow = !messages.has(msgid);
      if (canShow) {
        console.log('NABU_ADD_IN_TABLE:', msgid);
        dispatch({
          type: 'NABU_ADD_IN_TABLE',
          messageId: msgid
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.mustAdd(nextProps);
      this.showInTools(nextProps);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mustAdd(this.props);
      this.showInTools(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var marker = _props.marker;
      var _props$intl = _props.intl;
      var formatMessage = _props$intl.formatMessage;
      var formatHTMLMessage = _props$intl.formatHTMLMessage;
      var children = _props.children;
      var messages = _props.messages;
      var msgid = _props.msgid;
      var desc = _props.desc;
      var html = _props.html;
      var values = _props.values;

      var fallbackMessage = {
        id: msgid,
        defaultMessage: msgid,
        description: desc
      };

      var text = html ? formatHTMLMessage(messages.get(msgid, fallbackMessage), values) : formatMessage(messages.get(msgid, fallbackMessage), values);
      var markerOn = this.mustTranslate(messages, msgid) && marker;
      var highliteStyle = {
        backgroundColor: 'rgba(10,200,100, .5)'
      };

      return _react2.default.createElement(
        'span',
        { style: markerOn ? highliteStyle : null, dangerouslySetInnerHTML: { __html: text } },
        children
      );
    }
  }]);

  return NabuText;
}(_react.Component), _class2.propTypes = {
  msgid: _react.PropTypes.string.isRequired,
  desc: _react.PropTypes.string
}, _temp)) || _class);

module.exports = (0, _reactIntl.injectIntl)(NabuText);