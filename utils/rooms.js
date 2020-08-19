const rooms = [];

//When new room is created
function createRoom(room){
    if(rooms.indexOf(room)>-1){
        return false;
    }
    else{
        rooms.push(room);
        console.log('Room Created:',room);
    }
}

//Check room exists before joining
function checkRoom(room){
    if(rooms.indexOf(room)>-1){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    createRoom,
    checkRoom
};