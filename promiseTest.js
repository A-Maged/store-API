



function save(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('saved to DB')
            resolve(1)
        }, 2000);
    });
}


function apiCall(cb){
    return new Promise((resolve, reject)=>{
        console.log(cb)            
        setTimeout(()=>{
            console.log('called api')            
            resolve(2)
        }, 2000)
    })
}


function loadData(cb){
    return new Promise((resolve, reject)=>{
        console.log(cb)                                   
        setTimeout(()=>{
            console.log('loaded data') 
            resolve(3)
        }, 2000)
    });
}






save()
    .then((cb)=>apiCall(cb))
    .then((cb)=>loadData(cb))
    .then((cb)=>console.log(cb))
