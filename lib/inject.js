'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.inject = inject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function inject(Interface) {
    return function (target, key, desc) {
        if (typeof target != 'function') {
            desc.initializer = function () {
                return _container2['default'].getInstanceOf(Interface);
            };
        } else {
            throw new Error("inject can be only on member not on class");
        }
    };
}