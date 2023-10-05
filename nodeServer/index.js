// Node server which will handle socket io connections 

const io = require('socket.io')(8000)


const users ={};
//if any user joins we call it, let other users connected to the server node 
io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });

    // if someone sends a message, broadcast it to other people 
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //if someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
