var express = require('express');
var socket = require('socket.io');
var { userJoins, getCurrentUser } = require('./utils/users');
var { createRoom, checkRoom } = require('./utils/rooms');
let port = 3000;

// App Setup
var app = express();
var server = app.listen(port, function(){
    console.log('Listening on port: ',port);
});

// Static files
app.use(express.static('public'));

// Socket setup and server
var io = socket(server);

io.on('connection', (socket) =>{
    console.log('Socket Connection Established:',socket.id);

    //When user joins room
    socket.on('joinRoom',function (data) {
        if(checkRoom(data.room)){
            console.log('Logged In:', data);
            const user = userJoins(socket.id, data.name, data.room, data.host);
            socket.join(user.room);
            socket.emit('userJoinRequestAccepted',data);
        }
        else{
            console.log('Failed Login:',data);
            socket.emit('userJoinRequestRejected');
        }
    });

    //When user creates room
    socket.on('createRoom',function (data){
        if(checkRoom(data.room)){
            console.log('Failed to create room:',data);
            socket.emit('roomCreationFailed');
        }
        else{
            createRoom(data.room);
            const user = userJoins(socket.id, data.name, data.room, data.host);
            socket.join(user.room);
            socket.emit('roomCreateRequestAccepted',data);
        }
    });
});