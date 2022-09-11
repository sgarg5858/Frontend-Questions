let user={
    name:"Sanjay",
    sayHelloTo:function(friend1,friend2)
    {
        console.log(friend1,friend2)
        console.log(`${this.name} says hello to ${friend1} & ${friend2}` );
    }
}

let sayHello = user.sayHelloTo.bind(user,"Varun");

sayHello("Nitish")


Function.prototype.myBind= function(objectContext,...args1)
{
    let func=this;
    objectContext.func=func;
    return function(...args2)
    {
        objectContext.func(...args1,...args2);
    }
}
let sayHello2 = user.sayHelloTo.bind(user,"Varun");

sayHello2("Nitish")