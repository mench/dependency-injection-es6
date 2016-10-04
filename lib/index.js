'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _container = require('./container');

exports.container = _interopRequire(_container);

var _singleton = require('./singleton');

Object.defineProperty(exports, 'singleton', {
  enumerable: true,
  get: function get() {
    return _singleton.singleton;
  }
});

var _inject = require('./inject');

Object.defineProperty(exports, 'inject', {
  enumerable: true,
  get: function get() {
    return _inject.inject;
  }
});