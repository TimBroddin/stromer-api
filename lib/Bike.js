"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _Light = _interopRequireDefault(require("./Light"));

var _Position = _interopRequireDefault(require("./Position"));

var _ServiceInfo = _interopRequireDefault(require("./ServiceInfo"));

var _Settings = _interopRequireDefault(require("./Settings"));

var _State = _interopRequireDefault(require("./State"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bike =
/*#__PURE__*/
function () {
  function Bike(api) {
    _classCallCheck(this, Bike);

    this.api = api;
    this.light = new _Light.default(this.api, this);
    this.position = new _Position.default(this.api, this);
    this.serviceInfo = new _ServiceInfo.default(this.api, this);
    this.settings = new _Settings.default(this.api, this);
    this.state = new _State.default(this.api, this);
  }

  _createClass(Bike, [{
    key: "getBike",
    value: function () {
      var _getBike = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var bike;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.api.call("bike");

              case 2:
                bike = _context.sent;

                if (!(bike && bike.length)) {
                  _context.next = 8;
                  break;
                }

                this.bike = bike[0];
                return _context.abrupt("return", this.bike);

              case 8:
                throw new Error("No bike found.");

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getBike() {
        return _getBike.apply(this, arguments);
      };
    }() // convience methods

  }, {
    key: "lock",
    value: function () {
      var _lock = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.settings.set({
                  lock: true
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function lock() {
        return _lock.apply(this, arguments);
      };
    }()
  }, {
    key: "unlock",
    value: function () {
      var _unlock = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.settings.set({
                  lock: false
                });

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function unlock() {
        return _unlock.apply(this, arguments);
      };
    }()
  }, {
    key: "flash",
    value: function () {
      var _flash = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.light.set();

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function flash() {
        return _flash.apply(this, arguments);
      };
    }() // utility function to return bike. Avoids this.bike.bike

  }, {
    key: "obj",
    value: function obj() {
      return this.bike;
    }
  }]);

  return Bike;
}();

var _default = Bike;
exports.default = _default;