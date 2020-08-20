var socket = io.connect('https://rtb-mafia-game.herokuapp.com/');
//var socket = io.connect('http://192.168.29.138:3000/');

// Query DOM
var roomVal = document.getElementById('roomTxt');
var nameVal = document.getElementById('nameTxt');
var btnJoin = document.getElementById('btnJoin');
var btnCreate = document.getElementById('btnCreate');
var mainContainer = document.getElementById('mainContainer');


// Login Emitters
btnJoin.addEventListener('click', function () {
    var data = { host: false, name : nameVal.value, room : roomVal.value };
    socket.emit('joinRoom',data);
});

btnCreate.addEventListener('click', function () {
    var data = { host: true, name : nameVal.value, room : roomVal.value };
    socket.emit('createRoom',data);
});


// Listeners - General Client Only Events
socket.on('userJoinRequestAccepted', function (data) {
    mainContainer.innerHTML = '<div class="message is-success"><div class="message-header"> Username: '+data.name+', Room ID: '+data.room+' </div><div class="message-body"><p class="has-text-centered">Please wait while everybody joins.</p><p class="has-text-centered">Note: Do not close/refresh/go back. Any such action will result in disconnection and you wont be able to login again.</p><div class="buttons is-centered"><button class="button is-success is-loading">Loading</button></div></div></div>';
})

socket.on('userJoinRequestRejectedIncorrectRoom', function () {
    document.getElementById('login-alerts').innerHTML = '<div class="message is-danger"><div class="message-header">Invalid room code.</div></div>'
});

socket.on('userJoinRequestRejectedAlreadyExists', function () {
    document.getElementById('login-alerts').innerHTML = '<div class="message is-danger"><div class="message-header">Username already exists in room. Choose other name.</div></div>'
});


// Listeners - Host Only Events
socket.on('roomCreationFailed', function () {
    document.getElementById('login-alerts').innerHTML = '<div class="message is-danger"><div class="message-header">Room creation failed, kindly change room code.</div></div>'
});

socket.on('roomCreateRequestAccepted',function (data) {
    mainContainer.innerHTML = '<div class="message is-success"><div class="message-header"> Username: '+data.name+', Room ID: '+data.room+', Host:'+data.host+'</div><div class="message-body"><p class="has-text-centered">Click START GAME when everyone is in the room.</p><p class="has-text-centered">Note: Do not close/refresh/go back. Any such action will result in disconnection and you wont be able to login again.</p><div class="buttons is-centered" id="btnStartGame"><button class="button is-success">Start Game</button></div></div></div>';
});


// Listeners - Spectator Only Events
socket.on('isSpectator', function(data){
    mainContainer.innerHTML = '<div class="message is-success"><div class="message-header"> Spectator Mode, Room ID: '+data.room+' </div></div>';
});


// Listeners - All Clients
socket.on('userConnected',function(users_in_room){
    
    //Set Table Headers
    document.getElementById('playersTable').innerHTML = '<div class="message is-info"><div class="message-header"><p>Players Connected</p></div><div class="message-body"><div class="table-container"><table class="table is-fullwidth"><thead><tr><th>Sr. No.</th><th>Player</th></tr></thead><tbody id="tableBody">';
    var i = 1;
    users_in_room.forEach(element => {
        document.getElementById('tableBody').innerHTML += '<tr><th>'+ i +'</th><td>'+element.username+'</td></tr>' ;
        i += 1;
    });
    document.getElementById('playersTable').innerHTML += '</tbody></table></div></div></div>';
});