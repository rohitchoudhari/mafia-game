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
        console.log('Checker',( elementName === dataName))
        if( elementName === dataName && dataRoom === elementRoom){
            flag = false;
        }
    });
    return flag;
}

module.exports = {
    userJoins,
    getCurrentUser,
    getAllUsersFromRoom,
    isUserRoomPairAbsent
};