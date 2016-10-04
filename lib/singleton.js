'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.singleton = singleton;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function singleton(Clazz) {
    _container2['default'].registerAsSingleton(Clazz);
}