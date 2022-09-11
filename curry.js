let sum = (a,b,c,d,e) => a+b+c+d+e;

const curry = (fn,arity=fn.length)=>{
    console.log(fn,arity);
    let parameters=[];
    function helper(argument)
    {
        parameters.push(argument);
        console.log(parameters);
        if(parameters.length < arity)
        {
            return helper;
        }
        else
        {
           return fn.apply(null,parameters)
        }
    }
    return helper;
}

const curriedSum = curry(sum);
console.log( curriedSum(1)(2)(3)(4)(5))