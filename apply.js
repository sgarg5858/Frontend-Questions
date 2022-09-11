let user={
    name:"Sanjay",
    sayHelloTo:function(friend1,friend2)
    {
        console.log(friend1,friend2)
        console.log(`${this.name} says hello to ${friend1} & ${friend2}` );
    }
}

let helloFunc=user.sayHelloTo;

helloFunc.apply(user,["Varun","Nitish"])

Function.prototype.myApply=function(thisContext,args)
{
    thisContext.func=this;
    thisContext.func(...args);
}
helloFunc.myApply(user,["Varun","Nitish"])
