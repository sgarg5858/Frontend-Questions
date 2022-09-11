const rootA = document.getElementById('rootA');
const rootB = document.getElementById('rootB');
const nodeA = document.getElementById('nodeA');

const pathFromChildToParent=(parent,child)=>{
    let currentElement = child;
    const pathArray=[];
    while(currentElement !== parent)
    {
        const parenElement = currentElement.parentElement;
        //Here we are creating Array from Dom Collection which is an iterable
        //Dom COllection is read-only and live
        const children = Array.from(parenElement.children);
        console.log(children)
        const index = children.indexOf(currentElement);
        pathArray.push(index);
        currentElement=parenElement;
    }
    return pathArray;
}
const getValueFromPath=(pathArray,parent)=>
{
    let current=parent;
    let len =pathArray.length;
    for(let i=0;i<pathArray.length;i++)
    {
        let children = Array.from(current.children);
        current=children[pathArray[len-1-i]];
    }
    return current.textContent;
}
const path = pathFromChildToParent(rootA,nodeA);
console.log(path);
const value = getValueFromPath(path,rootB);
console.log(value);