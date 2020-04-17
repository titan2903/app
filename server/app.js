const express = require('express');
const http = require('http').Server(express);
const Socketio = require('socket.io')(http);
const Port = process.env.PORT || 4000

Socketio.on('connection', socket =>{
    socket.on('created', data =>{
        /* passing data to client */
    })
})

http.listen(Port, ()=> {
    console.log(`Server running on port: ${Port}`)
})