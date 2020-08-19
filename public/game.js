var socket = io.connect('http://192.168.29.138:3000');

// Query DOM
var roomVal = document.getElementById('roomTxt');
var nameVal = document.getElementById('nameTxt');
var btnJoin = document.getElementById('btnJoin');
var btnCreate = document.getElementById('btnCreate');
var masterContainer = document.getElementById('masterContainer');

// All Emitters
btnJoin.addEventListener('click', function () {
    var data = { host: false, name : nameVal.value, room : roomVal.value };
    socket.emit('joinRoom',data);
});

btnCreate.addEventListener('click', function () {
    var data = { host: true, name : nameVal.value, room : roomVal.value };
    socket.emit('createRoom',data);
});

// Listeners
socket.on('userJoinRequestAccepted', function (data) {
    masterContainer.innerHTML = '<div class="alert alert-info" role="alert"> Username: '+data.name+', Room ID: '+data.room+' </div>';
})

socket.on('userJoinRequestRejected', function () {
    document.getElementById('login-alerts').innerHTML = '<div class="alert alert-danger" role="alert">User join in request rejected, kindly check room code.</div>'
});

socket.on('roomCreationFailed', function () {
    document.getElementById('login-alerts').innerHTML = '<div class="alert alert-danger" role="alert">Room creation failed, kindly change room code.</div>'
});

socket.on('roomCreateRequestAccepted',function (data) {
    masterContainer.innerHTML = '<div class="alert alert-info" role="alert"> Username: '+data.name+', Room ID: '+data.room+', Host:'+data.host+' </div>';
});