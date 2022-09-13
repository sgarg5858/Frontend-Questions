function deepEquals(value1,value2)
{
    //Values should be of same types!
    if(typeof value1 !== typeof value2) return false;

     //Handling Null Values
     if( value1 === null || value2 === null)
     {
         return value1 === value2;
     }
     //Same References
     if(value1 === value2) return true;

    //Handling Primitives
    if(typeof value1 != 'object' && typeof value2 !='object')
    {
        if(Number.isNaN(value1) && Number.isNaN(value2))
        {
            return true;
        }
        return value1 === value2;
    }
    //Handling objects
    else if(typeof value1 === 'object' && typeof value2 === 'object')
    {
        //Handling Arrays
        if(Array.isArray(value1) && Array.isArray(value2))
        {
            console.log(value1,value2)
            if(value1.length !== value2.length)
            {
                return false;
            }
            for(let i=0;i<value1.length;i++)
            {
                if(!deepEquals(value1[i],value2[i]))
                {
                    return false;
                }
            }
            return true;
        }
        else if(Array.isArray(value1) || Array.isArray(value2))
        {
            return false;
        }
        //Objects
        else
        {
           

            const keys1= Object.keys(value1);
            const keys2 = Object.keys(value2);
            if(keys1.length != keys2.length) return false;
            if(!deepEquals(keys1,keys2)) return false;
            for(let i=0;i<keys1.length;i++)
            {
                let key=keys1[i];
                if(!deepEquals(value1[key],value2[key])) return false;
            }

            //Cant do this as order might be different
            // if(!deepEquals(entries1,entries2)) return false;
            
            return true;
        }
    }
  
}

