// import MessagingService from './messagingService';
var app = require('express')()
var http = require('http').createServer(app);
var io = require('socket.io')(http);

users = [];
connections = [];
msgs = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {    
    socket.on('start chat', function (user) {
        socket.userName = user;
        connections.push(socket);
        socket.emit('initialize chat', {messages:msgs,users:users});
        users.push({
            name : user,
            messageCount : 0
        });
        io.emit('update active users',{
            append : true,
            name : user,
            messageCount : 0
        })
        socket.emit('Highlight Me',users.length)
    })

    socket.on('post message', function (msg) {
        let el = '<li><strong>'+socket.userName+':</strong>'+msg+'</li>';
        msgs.push(el);
        let userIndex = -1
        for (i =0; i < users.length; i++){
            if(users[i].name === socket.userName){
                users[i].messageCount ++;
                userIndex = i;
                break;
            }
        }
        io.emit('new message', {"message":msg,"user":socket.userName,"userIndex":userIndex +1});
    });
    socket.on('disconnect', function () {
        io.emit('update active users',{append : false,index : connections.indexOf(socket)+1});
        users.splice(connections.indexOf(socket), 1);     
        connections.splice(connections.indexOf(socket), 1);
        if (socket.userName !== undefined) {
            console.log("User %s is disconnected", socket.userName);
        }
    })
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});