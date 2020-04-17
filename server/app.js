const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routers');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let users = [];

io.on('connection', (socket) => {
  console.log('an user connected');
  socket.on('emitUser', (user) => {
    let player = {
      name: user,
      score: 0,
    };

    users.push(player);
    io.emit('pemain', users);
  });

  socket.on('total_score', (score) => {
    users.forEach((user) => {
      if (user.name === score.name) {
        user.score = score.score;
      }
    });

    io.emit('pemain', users);
  });

  socket.on('startGame', (words) => {
    io.emit('created', words);
    socket.broadcast.emit('created', 'socket broadcast');
  });

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });
});


app.use(router);
app.use(errorHandler);


http.listen(port, () => {
  console.log(`Server running on PORT : ${port} !!`);
});

