
const bindings = new Map();
const singletons = new Map();


export default class Container {

    static bind(iClass,Class,options){
        bindings.set(iClass,Class);
        if(options && options.singleton){
            this.registerAsSingleton(Class);
        }
    }

    static getInstanceOf(clazz){
        if(bindings.has(clazz)){
            clazz = bindings.get(clazz);
            return this.resolve(clazz);
        }
        return this.resolve(clazz);
    }

    static resolve(clazz){
        if(singletons.has(clazz)) {
            return this.resolveSingleton(clazz);
        }
        return new clazz();

    }

    static registerAsSingleton(clazz) {
        if(!singletons.has(clazz)) {
            singletons.set(clazz, null);
        }
    }

    static resolveSingleton(clazz) {
        if(singletons.get(clazz) === null) {
            singletons.set(clazz, new clazz());
        }
        return singletons.get(clazz);
    }

}
