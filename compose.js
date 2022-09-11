const makeItUpperCase =(str)=>str.toUpperCase();
const splitTheString = (str) =>str.split(" ");
const trimTheString = (str)=> str.trim();

const initialString = "  Hello my name is Sanjay garg       ";

const compose = function(...functions)
{
    return function(input)
    {
       return functions.reduceRight((acc,currentFn)=>{
            return currentFn(acc);
        },input)
    }
}
//right to left
const pipeline =compose(splitTheString,makeItUpperCase,trimTheString);
let result = pipeline(initialString);
console.log(result);