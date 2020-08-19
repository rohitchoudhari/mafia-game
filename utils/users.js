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

module.exports = {
    userJoins,
    getCurrentUser
};