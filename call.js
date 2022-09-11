let user={
    name:"Sanjay",
    sayHelloTo:function(friend)
    {
        console.log(friend)
        console.log(`${this.name} says hello to ${friend}` );
    }
}

let helloFunc=user.sayHelloTo;

// helloFunc.call(user,"Varun")

Function.prototype.myCall=function(thisContext,...args)
{
    thisContext.func=this;
    thisContext.func(...args);
}
helloFunc.myCall(user,"Varun")
