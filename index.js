var express = require('express');
var socket = require('socket.io');
var { userJoins, getCurrentUser, getAllUsersFromRoom, isUserRoomPairAbsent, disconnectRemoveSocketID, getAllUsers } = require('./utils/users');
var { createRoom, checkRoom } = require('./utils/rooms');
let port = process.env.PORT || 3000;

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
        
        console.log('Login data for new user:',data);
        console.log('Is User Room Pair Absent:',isUserRoomPairAbsent(data));
        //Validate Room
        if(checkRoom(data.room)){
            if(isUserRoomPairAbsent(data)){
                console.log('Logged In:', data);
                const user = userJoins(socket.id, data.name, data.room, data.host);
                socket.join(user.room);
                if(data.name == "spectator@rtb"){
                    socket.emit('isSpectator',data);
                }
                else{
                    socket.emit('userJoinRequestAccepted',data);
                }
                var users_in_room = getAllUsersFromRoom(data.room);
                //console.log(users_in_room);
                io.in(data.room).emit('updatePlayersTable',users_in_room);
            }
            else{
                console.log('Failed Login (User-Room Pair Already Exists):',data);
                socket.emit('userJoinRequestRejectedAlreadyExists');
            }
        }
        else{
            console.log('Failed Login (Incorrect Room Code):',data);
            socket.emit('userJoinRequestRejectedIncorrectRoom');
        }

    });

    //When user disconnects
    socket.on('disconnect',function(){
        var room_id = disconnectRemoveSocketID(socket.id);
        var users_in_room = getAllUsersFromRoom(room_id);
        io.in(room_id).emit('updatePlayersTable',users_in_room);
    });



    // Host Events
    // When user creates room
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
            var users_in_room = getAllUsersFromRoom(data.room);
            socket.emit('updatePlayersTable',users_in_room);
        }
    });

    // When host starts game
    //socket.on('startGame', function(){

    //});
});