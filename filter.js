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


Array.prototype.myFilter = function(callbackFn)
{
    let arrayList=this;
    let newArray=[];
    for(let i=0;i<arrayList.length;i++)
    {
       if(callbackFn(arrayList[i]))
       {
        newArray.push(arrayList[i]);
       }
    }
    return newArray;
}

const outputItems = Array.from(listItems).myMap((item)=>{
    const clone=item.cloneNode(true);
    clone.textContent=Number(clone.textContent) * Number(clone.textContent);
    return clone.textContent;
})
.myFilter((val)=>{
   return  Number(val)%2===0
})
console.log(outputItems);

