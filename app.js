const express = require('express');
const  env=require('dotenv').config();
const logger = require('morgan');
const createError = require('http-errors');
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const fileupload=require('express-fileupload');
const socketServer=require('./socketServer')
const {Server} =require('socket.io');

const userRouter=require('./router/user');
const postRouter=require('./router/post')
const chatRouter=require('./router/chat')

const app = express();
const server = http.createServer(app);

app.use(cors())

app.use(logger('dev'));
app.use(express.json());



//change to config files
mongoose.connect(process.env.mongoURL).then((res) => {
  console.log("mongodb connected")
})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection',(socket)=>{
  socketServer(socket)
})

app.use(fileupload({
  useTempFiles:true
}))

app.use('/',userRouter)
app.use('/post',postRouter)
app.use('/chat',chatRouter)


//change to middleware
app.use(function (req, res, next) {
    next(createError(404));
  });
app.use(function (err,req, res, next) {
    res.json({err})
  });

const PORT=process.env.PORT||5000
server.listen(PORT, () =>
  console.log(` app listening on port ${PORT}!`),
);