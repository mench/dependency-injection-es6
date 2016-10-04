import container from './container';

export function singleton(Clazz) {
    container.registerAsSingleton(Clazz);
}
