const promise1 = new Promise((resolve,reject)=>{
    resolve(1);
})

const promise2 = new Promise((resolve,reject)=>{

    setTimeout(()=>{
        reject(new Error("Bingo!"));
    },500)

})

const promise3 = 3;


Promise.myAllSettled=(promiseCandidates)=>{

    if(Array.isArray(promiseCandidates))
    {
    let results=[];
    let count=promiseCandidates.length;
    return new Promise((resolve,reject)=>{

        promiseCandidates.forEach((candidate,index)=>{
            
            if(candidate instanceof Promise)
            {
                candidate.then((result)=>{
                    results[index]=result;
                    count--;
                    if(count ===0)
                    {
                        resolve(results);
                    }
                }).catch((err)=>{
                    results[index]=err;
                    count--;
                    if(count ===0)
                    {
                        resolve(results);
                    }
                })
            }
            else
            {
                results[index]=candidate;
                count--;
                if(count ===0)
                    {
                        resolve(results);
                    }
            }
        })

    })
    }
    else
    {
        // return Promise.reject("Pass an array of promises!");
        throw new Error('Pass an array of promises!')
    }

}

Promise.myAllSettled([promise1,promise2,promise3])
.then((data)=>{
    console.log(data);
})
.catch((error)=>{
    console.error(error)
})