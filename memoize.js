const body =document.getElementById('body');
const addToDOM=(data)=>{
    const el = document.createElement('div');
    el.textContent=data;
    body.append(el);
}

const addThreeNumbers = (a,b,c) => a+b+c;

const memoize = (fn)=>{
    //closure scope
    const cache={};
    //We have to return a function which takes fn arguments
    return (...args) =>
    {
        addToDOM(`Inputs ${args}`)

        //This is important because objects are stored by reference,
        // when we try to look array with same values it may return false,
        // as by default objects are compared with references &
        // in object we cannot store objects as keys
        const argsToString = JSON.stringify(args);

        if(argsToString in cache)
        {
            addToDOM(`Fetching from cache for key ${argsToString}`,cache[argsToString]);
        }
        else
        {
            const result = fn.apply(this,args);
            addToDOM(`Computing values for key ${argsToString}`)
            cache[argsToString]=result;
        }

        return cache[argsToString];
    }
}

let user=
{
    name:"Sanjay",
    addThreeNumbers:function(a,b,c)
    {
        console.log(this.name);
        return a+b+c;
    }
}

const add = memoize(user.addThreeNumbers.bind(user));

console.log(add(1,2,3));
console.log(add(1,2,3));
console.log(add(3,4,5));
console.log(add(3,4,5));

