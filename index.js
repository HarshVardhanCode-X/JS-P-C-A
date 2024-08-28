const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Brown", email: "bob@example.com" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com" }
];

// Answer 1:
function fetchUserByIdCallback(id,callback){
    setTimeout(()=>{
        let user=users.find(k => k.id==id);
        if(user){
            callback(user)
        }else{
            callback("Data not found")
        }
    },1000)
}
fetchUserByIdCallback(5,i => {
    console.log(i);
});


// Answer 2:
function fetchUserByIdCallback(id,callback){
    if(!id) return callback("ID not found");
    if(typeof id!=="number") return callback("Invalid Id number");
    setTimeout(()=>{
        let user=users.find(k => k.id==id);
        if(user){
            callback(user)
        }else{
            callback("Data not found")
        }
    },1000)
}
fetchUserByIdCallback(5,i => {
    console.log(i);
})


// Answer 3:
function fetchUserByIdCallback(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            let user=users.find(k => k.id==id);
            if(user){
                resolve(user);
            }else{
                reject(`User not found ${id}`);
            }
        }, 2000);
    });
}
fetchUserByIdCallback("hi")
    .then(user => {
        console.log("The Fetched Entry Is--", user);
    })
    .catch(error => {
        console.error("Error--", error);
    });


// Answer 4:
function fetchUserByIdCallback(id,callback){   // Callback Function created.
    setTimeout(()=>{
        const user=users.find(user => user.id===id);
        if(user){
            callback(null,user);
        }else{
            callback(`User not found ${id}`,null);
        }
    },1000);
}
function fetchUserByIdPromise(id) {            // Promise Function created.
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            const user=users.find(user => user.id===id);
            if(user){
                resolve(user);
            }else{
                reject(`User not found ${id}`);
            }
        }, 2000);
    });
}
// Combining Both.
function fetchUserById(id,callback){
    fetchUserByIdCallback(id, (error, user)=>{
        if(error){
            console.log("Callback Failed, Promise Initializing...");
            fetchUserByIdPromise(id)
                .then(user=>callback(null,user))
                .catch(err=>callback(err,null));
        }else{
            callback(null,user);
        }
    });
}

// Giving Input.
fetchUserById(5,(error,user)=>{
    if(error){
        console.error("Error",error);
    }else{
        console.log("Found:", user);
    }
});


// Answer 5:
async function fetchUserByIdAsync(id) {
    const user=users.find(user=>user.id===id);
    if(user){
        return user;
    }else{
        throw new Error(`User with id ${id} not found.`);
    }
}
async function getUserData(id) {
    try{
        const user=await fetchUserByIdAsync(id);
        console.log("Found:", user);
    }catch(error){
        console.error("Error:", error.message);
    }
}
getUserData(2);



