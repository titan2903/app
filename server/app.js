const express = require('express');
const http = require('http').Server(express);
const Socketio = require('socket.io')(http);
const Port = process.env.PORT || 4000

Socketio.on('connection', socket =>{
    socket.on('typing', data =>{

    })
})

http.listen(Port, ()=> {
    console.log(`Server running on port: ${Port}`)
})