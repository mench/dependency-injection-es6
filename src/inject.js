import container from './container';

export function inject(Interface) {
    return (target,key,desc)=> {
        if(typeof target != 'function'){
            desc.initializer = ()=>{
                return container.getInstanceOf(Interface);
            }
        }else{
            container.registerDependencies(target,...arguments);
        }

    };
}