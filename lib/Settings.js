"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Settings =
/*#__PURE__*/
function () {
  function Settings(api, bike) {
    _classCallCheck(this, Settings);

    this.api = api;
    this.bike = bike;
    this.settings = {};
  }

  _createClass(Settings, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.bike || !this.bike.obj())) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.bike.getBike();

              case 3:
                _context.next = 5;
                return Promise.all([this.getMainSettings(), this.getSensorSettings(), this.getTuning()]);

              case 5:
                return _context.abrupt("return", this.settings);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function get() {
        return _get.apply(this, arguments);
      };
    }()
  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.bike || !this.bike.obj())) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.bike.getBike();

              case 3:
                _context2.next = 5;
                return this.api.post("bike/".concat(this.bike.obj().bikeid, "/settings/"), obj);

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function set(_x) {
        return _set.apply(this, arguments);
      };
    }()
  }, {
    key: "getSettings",
    value: function () {
      var _getSettings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(fields) {
        var settings, field;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.bike || !this.bike.obj())) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.bike.getBike();

              case 3:
                _context3.next = 5;
                return this.api.call("bike/".concat(this.bike.obj().bikeid, "/settings/?fields=").concat(fields.join(",")));

              case 5:
                settings = _context3.sent;

                for (field in settings) {
                  this.settings[field] = settings[field];
                }

                return _context3.abrupt("return", this.settings);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getSettings(_x2) {
        return _getSettings.apply(this, arguments);
      };
    }()
  }, {
    key: "getMainSettings",
    value: function () {
      var _getMainSettings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getSettings(["auto_lock_mode", "auto_power_off_time", "date_format", "distance_unit", "language", "speed_unit", "clock_format"]);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getMainSettings() {
        return _getMainSettings.apply(this, arguments);
      };
    }()
  }, {
    key: "getSensorSettings",
    value: function () {
      var _getSensorSettings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getSettings(["recup_level_user_offset", "user_torque_sensitivity"]);

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getSensorSettings() {
        return _getSensorSettings.apply(this, arguments);
      };
    }()
  }, {
    key: "getTuning",
    value: function () {
      var _getTuning = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getSettings(["tuning_speed", "tuning_torque", "tuning_agility"]);

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function getTuning() {
        return _getTuning.apply(this, arguments);
      };
    }()
  }]);

  return Settings;
}();

var _default = Settings;
exports.default = _default;