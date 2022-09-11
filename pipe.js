const makeItUpperCase =(str)=>str.toUpperCase();
const splitTheString = (str) =>str.split(" ");
const trimTheString = (str)=> str.trim();

const initialString = "  Hello my name is Sanjay garg       ";

const pipe = function(...functions)
{
    return function(input)
    {
       return functions.reduce((acc,currentFn)=>{
            return currentFn(acc);
        },input)
    }
}
//left to right
const pipeline =pipe(trimTheString,makeItUpperCase,splitTheString);
let result = pipeline(initialString);
console.log(result);