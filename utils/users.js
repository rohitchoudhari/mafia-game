const users = [];

// When user joins server
function userJoins(id, username, room, host){
    const user = {id, username, room, host};
    users.push(user);
    return user;
};

// Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id);
};

//Get all users
function getAllUsers(){
    return users;
}

// Get all users from a particular room
function getAllUsersFromRoom(room){
    users_in_room = [];
    users.forEach(element => {
        if(element.room == room){
            users_in_room.push(element);
        }
    });
    return users_in_room;
}

// Check if user-room pair already exists
function isUserRoomPairAbsent(data){
    var dataName = JSON.stringify(data.name);
    var dataRoom = JSON.stringify(data.room);
    var flag = true;
    users.forEach(element => {
        var elementName = JSON.stringify(element.username);
        var elementRoom = JSON.stringify(element.room);
        if( elementName === dataName && dataRoom === elementRoom){
            flag = false;
        }
    });
    return flag;
}
// User from Socket ID
function disconnectRemoveSocketID(socketid){
    var room_id;
    var element_to_delete;
    users.forEach(element => {
        if(element.id === socketid){
            room_id = element.room;
            index_to_delete = users.indexOf(element);
        }
    });
    users.splice(index_to_delete,1);
    return room_id;
}

module.exports = {
    userJoins,
    getCurrentUser,
    getAllUsersFromRoom,
    isUserRoomPairAbsent,
    disconnectRemoveSocketID,
    getAllUsers
};