import {container,inject,singleton} from '../index';

class SimpleClass{
    member = "test";
}

class Config {
    get(){}
}

class ConfigImpl extends Config{

    @inject(SimpleClass)
    simple:SimpleClass;

    name = "Test";
    constructor(){
        console.info("call constructor");
        super();
    }

    get(){
        console.info("get config");
    }
}


class Service {

    @inject(Config)
    config:Config;

    sendMessage(){
        console.info("Service:send");
    }
}

@singleton
class DevService  extends Service{
    constructor(){
        console.info("constructor");
        super();
    }
    sendMessage(){
        console.info("send msg:")
    }
}


class ProdService extends Service{

}

class HasDependencies {

    @inject(Service)
    service:Service;

    @inject(Config)
    config:Service;

    constructor(){
        console.info('args',arguments)
        this.service.sendMessage();
    }
}


class Test{

    @inject(Service)
    service:Service;

}


container.bind(Service,DevService);
container.bind(Config,ConfigImpl,{singleton:true});

var instance = container.resolve(HasDependencies);
instance.service.sendMessage();
var test = container.resolve(Test);
var service = container.getInstanceOf(Service);
console.info(service);
console.info("instance= ",instance);
