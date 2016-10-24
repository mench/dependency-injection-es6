# dependency-injection-es6

dependency-injection-es6 is a dependency injection library for Node.js and Javascript environments where ES6 is supported.

Dependency injection is a software design pattern that implements inversion of control for resolving dependencies. A dependency is an object that can be used (a service). An injection is the passing of a dependency to a dependent object (a client) that would use it.

## Installation

```sh
$ npm install --save dependency-injection-es6
```

## Requirements

dependency-injection-es6 requires a Javascript environment with ES6 classes and  decorators. Babel is included as a dependency to make the library compatible
with environments that do not support these features directly.

## Getting Started

For resolving dependencies of classes you will need to use @inject decorator and  container class to resolve instance  

```javascript
import {container,inject,singleton} from 'dependency-injection-es6';

class SameClass {}

class App {

    @inject(SameClass)
    config:SameClass;
}
```

### Example

#### Service Classes

```javascript

class MessageService {
    
    sendMessage(msg:String){}
  
}
```

```javascript
import {singleton} from 'dependency-injection-es6';

@singleton
class EmailService extends MessageService {
    
    sendMessage(msg:String){
        console.info("Email Message sent from EmailService");
    }
}
```

EmailService is one of the implementations of MessageService. Notice that class is annotated with 
@singleton annotation. Since service objects will be created through injector classes, this annotation is provided to let them know that the service classes are singleton objects.

We have another service implementation to send facebook messages.

```javascript
import {inject} from 'dependency-injection-es6';

class FacebookService extends MessageService {
    
    sendMessage(msg:String){
        console.info("Message sent to Facebook user from FacebookService");
    }
}
```

#### Consumer Class

```javascript
import {inject} from 'dependency-injection-es6';
import MessageService from './MessageService';

class MyApplication {

    @inject(MessageService)
    service:MessageService;
  
    constructor(){
        console.info("will be injected",this.service);
    }
}
```

#### Bindings

```javascript
import {container} from 'dependency-injection-es6';

//bind the service to implementation class
container.bind(MessageService,EmailService);

//or bind MessageService to Facebook Message implementation 
//container.bind(MessageService,FacebookService);

//make a singleton with option {singleton:true}
//container.bind(MessageService,MessageService,{singleton:true});


```

#### Resolve instance

```javascript

var instance = container.resolve(MyApplication);
instance.service.sendMessage("Hello");

```

You can get injected class instance by calling getInstanceOf() method.

```javascript
import {container,inject} from 'dependency-injection-es6';

class Config {
    get(){ return {/** .. **/}}
}

class Service {

    @inject(Config)
    config:Config;
}

class App{
    
    @inject(Service)
    service:Service;
}

var service = container.getInstanceOf(Service);
console.info(service);

```

#### Inject with constructor.

```javascript
import {container,inject} from 'dependency-injection-es6';
import {MyDependency1} from './my-dependency1';
import {MyDependency2} from './my-dependency2';

@inject(MyDependency1,MyDependency2)
class MyApplication {
    constructor(myDependency1,myDependency2) {
        this.myDependency1 = myDependency1;
        this.myDependency2 = myDependency2;
    }
}

```
Dependencies of a class are injected through the constructor.