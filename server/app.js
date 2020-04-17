const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('startGame', (words) => {
//     io.local.emit('gameOn', words)
//     socket.broadcast.emit('', message)
//   })
// });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on PORT : ${port} !!`)
})