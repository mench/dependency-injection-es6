'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _slice = Array.prototype.slice;
exports.inject = inject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function inject(Interface) {
    var _arguments = arguments;

    return function (target, key, desc) {
        if (typeof target != 'function') {
            desc.initializer = function () {
                return _container2['default'].getInstanceOf(Interface);
            };
        } else {
            _container2['default'].registerDependencies.apply(_container2['default'], [target].concat(_slice.call(_arguments)));
        }
    };
}