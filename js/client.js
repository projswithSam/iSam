
const socket = io("http://localhost:8000",{transports:["websocket"]});
// get Dom elements in respective JS version variables



const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('news-ting-6832.mp3')

// function append event info to the container 
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        
        audio.play();
    }


}
//ask user for name & let the server know 
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
// if new user joins receive the event from the server 
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right')


})
//if server sends message receive it 
socket.on('receive', data=>{
    append(`${data.name}: ${data.message} `, 'left')
})
// if a user leaves the chat append info to container
socket.on('leave', name =>{
    append(`${data.name} left the chat`, 'left')
})
// form gets submitted send server the message 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''
})
