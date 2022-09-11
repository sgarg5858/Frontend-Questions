const findPathArrayFromChildToParent =(childElement,parentElement) =>
{
    const pathArray=[];
    let currentElement = childElement;
    while(currentElement !== parentElement)
    {
        let parentOfCurrentElement = currentElement.parentElement;
        //Element.children returns Readonly Live Dom Collection 
        //Its not an array but implements iterable interface
        let childrenOfParentElement = Array.from(parentOfCurrentElement.children);
        let childIndex = childrenOfParentElement.indexOf(currentElement);
        pathArray.push(childIndex);
        currentElement=parentOfCurrentElement;
    }
    return pathArray;
}

const findNodeValueFromParentGivenPathArray = (parentElement,pathArray) =>
{
    let currentElement=parentElement;
    for(let i=0;i<pathArray.length;i++)
    {
        let childrenOfCurrentElement = Array.from(currentElement.children);
        currentElement=childrenOfCurrentElement[pathArray[i]];
    }
    return currentElement.textContent
}

(()=>{
    let rootAElement = document.getElementById('rootA');
    let rootBElement = document.getElementById('rootB');
    let nodeAElement = document.getElementById('nodeA');
    if(rootAElement && rootBElement && nodeAElement)
    {
        const pathArrayFromChildToParent=findPathArrayFromChildToParent(nodeAElement,rootAElement);
        const pathArrayFromParentToChild = pathArrayFromChildToParent.reverse();
        const nodeValue = findNodeValueFromParentGivenPathArray(rootBElement,pathArrayFromParentToChild);
        console.log(nodeValue);
    }
})()