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


@inject(Config)
class MyDependency1 {
    constructor(config){
        console.info("constructor MyDependency1",config)
    }

}

@inject(SimpleClass)
class MyDependency2 {
    constructor(simple){
        console.info("constructor MyDependency2",simple)
    }
}

@inject(MyDependency1,MyDependency2)
class HasDependencies {

    @inject(Service)
    service:Service;

    @inject(Config)
    config:Service;

    constructor(myDep1,myDep2){
        console.info('args',arguments)
        this.service.sendMessage();
        console.info(myDep1,myDep2);
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
