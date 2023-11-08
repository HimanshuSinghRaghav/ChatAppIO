const io = require('socket.io')(8800  , {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174'],
    }
})

let activeUsers = [] ;
io.on("connection" , (socket) => { 
    // add new User
    socket.on("new-user-add" , (newUserId) => {
         // if user is not in added previously
         if(!activeUsers.some((user)=> user.userId === newUserId)){
             activeUsers.push({userId : newUserId , socketId : socket.id})
              
         }  
         console.log("connected" , activeUsers)
         io.emit("get-users" , activeUsers);
        })
 
        socket.on("send-message" , (data) => {   
            console.log(data)
            const user = activeUsers.find((user) => user.userId === data.receiverId); 
            console.log(activeUsers ,data, "jjjjjjjjjj")
            if(user){ 
                io.to(user.socketId).emit("receive-message" , data)
            }  
        }) 

        socket.on("disconnect" , () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            console.log("disconnected" , activeUsers);
            io.emit("get-users" , activeUsers);
        })
    })