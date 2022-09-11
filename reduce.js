const listItems = document.querySelectorAll('li');

Array.prototype.myMap = function(callbackFn)
{
    let arrayList=this;
    let newArray=[];
    for(let i=0;i<arrayList.length;i++)
    {
        newArray.push(callbackFn(arrayList[i]));
    }
    return newArray;
}


Array.prototype.myReduce = function(callbackFn,initialValue)
{
    let acc=initialValue;
    let arrayList=this;
    for(let i=0;i<arrayList.length;i++)
    {
        acc=callbackFn(acc,arrayList[i],i,arrayList);
    }
    return acc;
}

const sum = Array.from(listItems).myMap((item)=>{
    const clone=item.cloneNode(true);
    let square=Number(clone.textContent) ;
    clone.textContent=square;
    return square;
})
.myReduce((acc,val)=>{
    return acc + val;
},0)
console.log(sum);

