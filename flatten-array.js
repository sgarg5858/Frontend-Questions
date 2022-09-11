let nestedArray=[[[1,[1.1]],2,3],[4,5]];

const flattenArray = (nestedArray) => {
    let flatArray=[];
    nestedArray.forEach(element => {
        if(Array.isArray(element))
        {
            let flattened = flattenArray(element);
            flatArray.push(...flattened);
        }
        else
        {
            flatArray.push(element);
        }
    });
    console.log(flatArray);
    return flatArray;
}

//Good Implementation
const flattenArrayUsingReduce = (nestedArray) => {
    
    return nestedArray.reduce((flatArray,element) => {

        if(Array.isArray(element))
        {
            let flattened = flattenArray(element);
            flatArray.push(...flattened);
        }
        else
        {
            flatArray.push(element);
        }
        return flatArray;
    },[]);
}

const flattened = flattenArrayUsingReduce(nestedArray);
console.log(flattened);