"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/register");

require("@babel/polyfill");

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _qs = _interopRequireDefault(require("qs"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _moment = _interopRequireDefault(require("moment"));

var _Bike = _interopRequireDefault(require("./Bike"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// require("request-debug")(request);
var Stromer =
/*#__PURE__*/
function () {
  function Stromer(options) {
    _classCallCheck(this, Stromer);

    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.username = options.username;
    this.password = options.password;
    this.jar = _requestPromise.default.jar();
    this.bike = new _Bike.default(this);
    this.LOGIN_URL = "https://api3.stromer-portal.ch/users/login/";
    this.TOKEN_URL = "https://api3.stromer-portal.ch/o/token/";
    this.API_URL = "https://api3.stromer-portal.ch/rapi/mobile/v2/";
  }

  _createClass(Stromer, [{
    key: "getCode",
    value: function () {
      var _getCode = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var loginPage, cookies, _cookies$split, _cookies$split2, _, csrf, queryString, $, formCsrf, form, code, redirect, authorize, location, _location$split, _location$split2, _2, _code;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _requestPromise.default)({
                  url: this.LOGIN_URL,
                  jar: this.jar
                });

              case 2:
                loginPage = _context.sent;
                cookies = this.jar.getCookieString(this.LOGIN_URL);
                _cookies$split = cookies.split("="), _cookies$split2 = _slicedToArray(_cookies$split, 2), _ = _cookies$split2[0], csrf = _cookies$split2[1];
                queryString = _qs.default.stringify({
                  client_id: this.client_id,
                  response_type: "code",
                  redirect_url: "stromerauth://auth",
                  scope: "bikeposition bikestatus bikeconfiguration bikelock biketheft bikedata bikepin bikeblink userprofile"
                });
                $ = _cheerio.default.load(loginPage);
                formCsrf = $("input[name=csrfmiddlewaretoken]").val();
                form = {
                  username: this.username,
                  password: this.password,
                  csrfmiddlewaretoken: formCsrf,
                  next: "/o/authorize/?".concat(queryString)
                };
                code = "";
                _context.prev = 10;
                _context.next = 13;
                return (0, _requestPromise.default)({
                  url: this.LOGIN_URL,
                  method: "post",
                  form: form,
                  jar: this.jar,
                  followRedirect: false,
                  headers: {
                    Referer: this.LOGIN_URL
                  }
                });

              case 13:
                redirect = _context.sent;
                _context.next = 40;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](10);

                if (!(_context.t0 && _context.t0.response && _context.t0.response.headers)) {
                  _context.next = 39;
                  break;
                }

                _context.prev = 19;
                _context.next = 22;
                return (0, _requestPromise.default)({
                  url: "https://api3.stromer-portal.ch" + _context.t0.response.headers.location,
                  followRedirect: false,
                  jar: this.jar
                });

              case 22:
                authorize = _context.sent;
                _context.next = 37;
                break;

              case 25:
                _context.prev = 25;
                _context.t1 = _context["catch"](19);
                _context.prev = 27;
                location = _context.t1.response.headers.location;
                _location$split = location.split("="), _location$split2 = _slicedToArray(_location$split, 2), _2 = _location$split2[0], _code = _location$split2[1];
                return _context.abrupt("return", _code);

              case 33:
                _context.prev = 33;
                _context.t2 = _context["catch"](27);
                console.log(_context.t2.response);
                console.log("beep");

              case 37:
                _context.next = 40;
                break;

              case 39:
                throw new Error(_context.t0);

              case 40:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 16], [19, 25], [27, 33]]);
      }));

      return function getCode() {
        return _getCode.apply(this, arguments);
      };
    }()
  }, {
    key: "getAccessToken",
    value: function () {
      var _getAccessToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(code) {
        var data, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = {
                  grant_type: "authorization_code",
                  client_id: this.client_id,
                  client_secret: this.client_secret,
                  code: code,
                  redirect_uri: "stromerauth://auth"
                };
                _context2.next = 3;
                return (0, _requestPromise.default)({
                  url: this.TOKEN_URL,
                  method: "post",
                  formData: data,
                  jar: this.jar
                });

              case 3:
                json = _context2.sent;
                return _context2.abrupt("return", JSON.parse(json).access_token);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getAccessToken(_x) {
        return _getAccessToken.apply(this, arguments);
      };
    }()
  }, {
    key: "call",
    value: function () {
      var _call = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(endpoint) {
        var code;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.accessToken) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this._callApi(this.accessToken, endpoint);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 6:
                _context3.next = 8;
                return this.getCode();

              case 8:
                code = _context3.sent;
                _context3.next = 11;
                return this.getAccessToken(code);

              case 11:
                this.accessToken = _context3.sent;

                if (!this.accessToken) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 15;
                return this._callApi(this.accessToken, endpoint);

              case 15:
                return _context3.abrupt("return", _context3.sent);

              case 18:
                throw new Error("No access token could be retrieved");

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function call(_x2) {
        return _call.apply(this, arguments);
      };
    }()
  }, {
    key: "_callApi",
    value: function () {
      var _callApi2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(access_token, endpoint) {
        var url, response, json;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = "".concat(this.API_URL).concat(endpoint);
                _context4.next = 3;
                return (0, _requestPromise.default)({
                  url: url,
                  headers: {
                    Authorization: "Bearer ".concat(access_token)
                  }
                });

              case 3:
                response = _context4.sent;
                json = JSON.parse(response);

                if (!(json.data && Object.keys(json.data).length)) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", json.data);

              case 9:
                if (!json.result) {
                  _context4.next = 13;
                  break;
                }

                throw new Error(json.result);

              case 13:
                throw new Error("Something went wrong calling: ".concat(url));

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function _callApi(_x3, _x4) {
        return _callApi2.apply(this, arguments);
      };
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(endpoint, data) {
        var code;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.accessToken) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 3;
                return this._postApi(this.accessToken, endpoint, data);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 6:
                _context5.next = 8;
                return this.getCode();

              case 8:
                code = _context5.sent;
                _context5.next = 11;
                return this.getAccessToken(code);

              case 11:
                this.accessToken = _context5.sent;

                if (!this.accessToken) {
                  _context5.next = 18;
                  break;
                }

                _context5.next = 15;
                return this._postApi(this.accessToken, endpoint, data);

              case 15:
                return _context5.abrupt("return", _context5.sent);

              case 18:
                throw new Error("No access token could be retrieved");

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function post(_x5, _x6) {
        return _post.apply(this, arguments);
      };
    }()
  }, {
    key: "_postApi",
    value: function () {
      var _postApi2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(access_token, endpoint, data) {
        var url, response, json;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = "".concat(this.API_URL).concat(endpoint);
                console.log(url);
                _context6.next = 4;
                return (0, _requestPromise.default)({
                  url: url,
                  headers: {
                    Authorization: "Bearer ".concat(access_token)
                  },
                  method: "POST",
                  json: true,
                  body: data
                });

              case 4:
                response = _context6.sent;
                json = response;

                if (!(json.data && Object.keys(json.data).length)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", json.data);

              case 10:
                if (!json.result) {
                  _context6.next = 14;
                  break;
                }

                return _context6.abrupt("return", json.result);

              case 14:
                throw new Error("Something went wrong calling: ".concat(url));

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function _postApi(_x7, _x8, _x9) {
        return _postApi2.apply(this, arguments);
      };
    }()
  }]);

  return Stromer;
}();

var _default = Stromer;
exports.default = _default;