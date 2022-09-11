const promise1 = new Promise((resolve,reject)=>{
    resolve(1);
})

const promise2 = new Promise((resolve,reject)=>{

    setTimeout(()=>{
        reject(2);
    },500)

})

const promise3 = Promise.reject(3);


Promise.myRace=(promiseCandidates)=>{

    if(Array.isArray(promiseCandidates))
    {
    let anyoneSettled=false;
    return new Promise((resolve,reject)=>{

        promiseCandidates.forEach((candidate,index)=>{
            
            if(candidate instanceof Promise)
            {
                candidate.then((result)=>{
                    if(!anyoneSettled)
                    {
                        anyoneSettled=true;
                        resolve(result)
                    }
                }).catch((err)=>{
                    if(!anyoneSettled)
                    {
                        anyoneSettled=true;
                        reject(err)
                    }
                })
            }
            else
            {
                if(!anyoneSettled)
                {
                    anyoneSettled=true;
                    resolve(result)
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

Promise.myRace([promise1,promise2,promise3])
.then((data)=>{
    console.log(data);
})
.catch((error)=>{
    console.error(error)
})