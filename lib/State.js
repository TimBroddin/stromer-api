"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var State =
/*#__PURE__*/
function () {
  function State(api, bike) {
    _classCallCheck(this, State);

    this.api = api;
    this.bike = bike;
  }

  _createClass(State, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var cached,
            status,
            statusObject,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cached = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

                if (!(!this.bike || !this.bike.obj())) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return this.bike.getBike();

              case 4:
                _context.next = 6;
                return this.api.call("bike/".concat(this.bike.obj().bikeid, "/state?cached=").concat(cached));

              case 6:
                status = _context.sent;

                if (!(status && status.length)) {
                  _context.next = 14;
                  break;
                }

                statusObject = Object.assign({}, status[0]);
                statusObject.rcvts = _moment.default.unix(statusObject.rcvts); // TODO: cached gives different timestamp

                this.status = statusObject;
                return _context.abrupt("return", this.status);

              case 14:
                throw new Error("Bike status could not be retrieved");

              case 15:
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
  }]);

  return State;
}();

var _default = State;
exports.default = _default;