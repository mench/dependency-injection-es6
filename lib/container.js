"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bindings = new Map();
var singletons = new Map();

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
            return new clazz();
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
                singletons.set(clazz, new clazz());
            }
            return singletons.get(clazz);
        }
    }]);

    return Container;
})();

exports["default"] = Container;
module.exports = exports["default"];