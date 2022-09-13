let user={
    name:"Sanjay",
    address: {
        city:"Bathinda",
        state:"Punjab",
        pincode:151201
    },
    skills:[
        {
            name:"Angular",
            exp:"3"
        },
        {
            name:"JavaScript",
            exp:"3"
        },
        {
            name:"rxJs",
            exp:"3"
        },
        {
            name:"ngRx",
            exp:"3"
        }
    ],
    friends:["Varun"]
}

Object.defineProperty(user,'name',{value:"Sanjay",writable:false,configurable:true,enumerable:true});
Object.defineProperty(user,'address',{value:user.address,writable:false,configurable:true,enumerable:true});
Object.defineProperty(user,'skills',{value:user.skills,writable:false,configurable:true,enumerable:true});
Object.defineProperty(user,'friends',{value:user.friends,writable:false,configurable:true,enumerable:true});
Object.defineProperty(user.skills,'0',{value:user.skills[0],writable:false,configurable:true,enumerable:true});
Object.defineProperty(user.skills[0],'name',{value:user.skills[0].name,writable:false,configurable:true,enumerable:true});

console.log(Object.getOwnPropertyDescriptors(user.skills[0]))
function deepCopyWithDescriptors(obj)
{
    let clone={};
    Object.keys(obj).forEach(((key)=>{
        console.log(key)
        if(typeof obj[key] === 'object')
        {
            if(Array.isArray(obj[key]))
            {
                let array=obj[key];
                let newArray=[];
                for(let i=0;i<array.length;i++)
                {
                    let item=array[i];
                    if(typeof item === 'object')
                    {
                        Object.defineProperty(newArray,i,{...Object.getOwnPropertyDescriptor(array,i),value:deepCopyWithDescriptors(array[i])})
                    }
                    else
                    {
                        Object.defineProperty(newArray,i,{...Object.getOwnPropertyDescriptor(array,i),value:array[i]});
                    }
                }
                Object.defineProperty(clone,key,{...Object.getOwnPropertyDescriptor(obj,key),value:newArray});
            }
            else
            {
                let deepCopy = deepCopyWithDescriptors(obj[key]);
                Object.defineProperty(clone,key,{...Object.getOwnPropertyDescriptor(obj,key),value:deepCopy});
            }
        }
        else
        {    
            Object.defineProperty(clone,key,Object.getOwnPropertyDescriptor(obj,key));
        }
    }))
    return clone;
}

let clonedUser = deepCopyWithDescriptors(user);
clonedUser.name="Sanju";
console.log(Object.getOwnPropertyDescriptors(clonedUser));
console.log(Object.getOwnPropertyDescriptors(clonedUser.friends));

// console.log("Cloned User",clonedUser,Object.getOwnPropertyDescriptor(clonedUser,'name'));
