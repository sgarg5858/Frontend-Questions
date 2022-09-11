const promise1 = new Promise((resolve,reject)=>{
    reject(1);
})

const promise2 = new Promise((resolve,reject)=>{

    setTimeout(()=>{
        reject(2);
    },500)

})

const promise3 = 3;


Promise.myAny=(promiseCandidates)=>{

    if(Array.isArray(promiseCandidates))
    {
    let errors=[];
    let count=promiseCandidates.length;
    return new Promise((resolve,reject)=>{

        promiseCandidates.forEach((candidate,index)=>{
            
            if(candidate instanceof Promise)
            {
                candidate.then((result)=>{
                    resolve(result)
                }).catch((err)=>{
                    errors[index]=err;
                    count--;
                    if(count===0)
                    {
                        reject(errors);
                    }
                })
            }
            else
            {
                resolve(candidate);
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

Promise.myAny([promise1,promise2,promise3])
.then((data)=>{
    console.log(data);
})
.catch((error)=>{
    console.error(error)
})