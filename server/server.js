const express = require("express");
const mongoose = require("mongoose");
const socketio = require('socket.io');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes");

const PORT = process.env.PORT || 8080;

app.use(cors());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());

app.use("/api", apiRouter);

(async function () {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to database");
  } catch (err) {
    console.log(err);
  }
})();

const expressServer = app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
const io = socketio(expressServer);
app.set('socketio', io);

io.use((socket, next)=>{
    const token = socket.handshake.query.token;
    console.log(token);
    if(token){
        try{
            const user = jwt.verify(token, process.env.JWT_SECRET);
            if(!user){
                return next(new Error('Not authorized.'));
            }
            socket.user = user;
            return next();
        }catch(err){
            next(err);
        }

    }else{
        return next( new Error('Not authorized.'));
    }
}).on('connection', (socket)=>{
    socket.join(socket.user.id);
    console.log('socket connected: ', socket.id);
});

