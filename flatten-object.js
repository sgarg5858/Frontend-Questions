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

function flattenObject(obj)
{
    return Object.keys(obj).reduce((flatObj,key)=>{
        if(typeof obj[key] === 'object' )
        {
            let flat=flattenObject(obj[key]);
            for(let ke in flat)
            {
                flatObj[`${key}.${ke}`]=flat[ke];
            }
        }
        else
        {
            flatObj[key]=obj[key];
        }
        return flatObj

    },{})
}
let flatObj= flattenObject(obj);
console.log(flatObj);