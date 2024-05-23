const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require("path");
const http = require('http')
const mongoose = require('mongoose');;
const socketio = require('socket.io');


dotenv.config({path: './.env'})
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

mongoose.connect('mongodb://localhost:27017/news-app')


const publicPath = path.join(__dirname, "../public");

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(publicPath));




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const customerRoutes = require('./routes/customer');
app.use('/', customerRoutes);

io.on('connection', (socket) => {
    console.log('New WebSocket connection');
  
    socket.on('sendMessage', ({ userId, message }) => {
      io.emit('message', { userId, message });
    });
  
    socket.on('disconnect', () => {
      console.log('User has left');
    });
  });
  
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


