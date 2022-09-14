interface IComment{
    id:number;
    postId:number;
    name:string;
    email:string;
    body:string;
}

const searchBox = document.getElementById('searchBox') as HTMLInputElement;
const suggestionBox = document.getElementById('suggestionBox');

const debounceTime = (fn:Function,delay=300) =>{

    let timer:any|undefined;
    return function(...args)
    {
        clearTimeout(timer);
        let that=this;
        timer=setTimeout(()=>{
            fn.apply(that,args);
        },delay)
    }
}

const throttleTime = (fn:Function,delay=300)=>
{
    let isCalled=false;
    return function(...args)
    {
        if(!isCalled)
        {
            isCalled=true;
            const that=this;
            fn.apply(that,args);
            setTimeout(()=>{
                isCalled=false;
            },delay)
        }
    }
}

let controller = new AbortController();

const GiveSignalAndCreateAgain =()=>{
    controller.abort();
    controller=new AbortController();
}

const getSuggestions = (keyword:string) => {
    return fetch('https://jsonplaceholder.typicode.com/comments',{signal:controller.signal})
    .then((response:Response)=>response.json())
    .then((comments:IComment[])=>
    comments
    .map((comment)=>comment.email).
    filter((email:string)=>email.toLocaleLowerCase().slice(0,keyword.length) ===  keyword.toLocaleLowerCase()))
}

function showSuggestions()
{
    if(suggestionBox)
    {
        suggestionBox.classList.add('show');
        suggestionBox.classList.remove('hide');
    }
}
function resetSuggestions()
{
    if(suggestionBox)
    {
        suggestionBox.classList.add('hide');
        suggestionBox.classList.remove('show');
        suggestionBox.innerHTML="";
    }
}

const renderSuggestions = (suggestions:string[]) => {
    const fragment = new DocumentFragment();
    suggestions.forEach((suggestion)=>{
        const option = document.createElement('div');
        option.textContent=suggestion;
        option.dataset.key=suggestion;
        option.classList.add('option');
        fragment.append(option);
    })
   if(suggestionBox)
   {
    showSuggestions();
    suggestionBox.innerHTML="";
    suggestionBox.append(fragment);
   }
}

const handleSearch = async (value:string)=>{
    try {
        GiveSignalAndCreateAgain();
        const suggestions:string[] = await getSuggestions(value);
        console.log(suggestions);
        renderSuggestions(suggestions);
    } catch (error:unknown) {
        console.log(error)
    }
}

const handleInput = (event:unknown) => {
    console.log(event);
    if(event instanceof Event)
    {
        const targetElement = event.target as HTMLInputElement;
        const inputValue = targetElement.value;
        console.log(inputValue);
        if(inputValue)
        {
            handleSearch(inputValue);
            
        }
        else
        {
            resetSuggestions();
        }
    }
}

const handleSelect = (event:Event) =>{
    const target = event.target as HTMLDivElement;
    const {key} = target.dataset;
    if(key)
    {
        searchBox.value=key;
        resetSuggestions();
    }
}

(()=>{

    if(searchBox && suggestionBox)
    {
        searchBox.addEventListener('input',throttleTime(handleInput,0));
        suggestionBox.addEventListener('click',handleSelect)
    }
})();
