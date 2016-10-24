"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bindings = new Map();
var singletons = new Map();
var DEPENDENCIES = Symbol('DEPENDENCIES');

var Container = (function () {
    function Container() {
        _classCallCheck(this, Container);
    }

    _createClass(Container, null, [{
        key: "bind",
        value: function bind(iClass, Class, options) {
            bindings.set(iClass, Class);
            if (options && options.singleton) {
                this.registerAsSingleton(Class);
            }
        }
    }, {
        key: "getInstanceOf",
        value: function getInstanceOf(clazz) {
            if (bindings.has(clazz)) {
                clazz = bindings.get(clazz);
                return this.resolve(clazz);
            }
            return this.resolve(clazz);
        }
    }, {
        key: "resolve",
        value: function resolve(clazz) {
            if (singletons.has(clazz)) {
                return this.resolveSingleton(clazz);
            }
            return this.resolveInstance(clazz);
        }
    }, {
        key: "resolveInstance",
        value: function resolveInstance(clazz) {
            if (typeof clazz != "function") throw new Error(clazz + " must be class not a " + typeof clazz);
            var classes = clazz[DEPENDENCIES] || [];
            var dependencies = classes.map(this.getInstanceOf.bind(this));
            return new (_bind.apply(clazz, [null].concat(_toConsumableArray(dependencies))))();
        }
    }, {
        key: "registerAsSingleton",
        value: function registerAsSingleton(clazz) {
            if (!singletons.has(clazz)) {
                singletons.set(clazz, null);
            }
        }
    }, {
        key: "resolveSingleton",
        value: function resolveSingleton(clazz) {
            if (singletons.get(clazz) === null) {
                singletons.set(clazz, this.resolveInstance(clazz));
            }
            return singletons.get(clazz);
        }
    }, {
        key: "registerDependencies",
        value: function registerDependencies(clazz) {
            for (var _len = arguments.length, dependencies = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                dependencies[_key - 1] = arguments[_key];
            }

            clazz[DEPENDENCIES] = dependencies;
        }
    }]);

    return Container;
})();

exports["default"] = Container;
module.exports = exports["default"];