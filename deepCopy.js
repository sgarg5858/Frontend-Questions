let obj={
    A:1,
    B:2,
    C:{
        D:3,
        E:{
            F:4,
            G:5
        },
        H:[6,7]
    }
}

const createDeepCopy = (obj) =>{

   return Object.keys(obj).reduce((deepCopy,key)=>{

    if(typeof obj[key] === 'object' )
    {
        if(Array.isArray(obj[key]))
        {
            deepCopy[key]=[...obj[key]];
        }
        else
        {
            deepCopy[key]=createDeepCopy(obj[key]);
        }
    }
    else
    {
        deepCopy[key]=obj[key];
    }
    return deepCopy;
   },{})
}
let deep = createDeepCopy(obj);
console.log(deep, obj.C ===deep.C,  obj.C.E === deep.C.E)

let shallow = {...obj};
console.log(shallow, obj.C ===shallow.C,  obj.C.E === shallow.C.E)
