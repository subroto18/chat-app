const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
require("dotenv").config();

const cors = require("cors");
const connectDB = require("./database/index.js");
const indexRoute = require("./routes/index.route.js");
const userRoute = require("./routes/user.route.js");
const chatRoute = require("./routes/chat.route.js");
const messageRoute = require("./routes/message.route.js");
const notFound = require("./middlewares/notfound.middleware.js");
const error = require("./middlewares/error.middleware.js");
const cookieParser = require("cookie-parser");
const { use } = require("bcrypt/promises.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
};

const server = http.createServer(app);

app.use(cors(corsOptions)); // Enable CORS for all routes

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true,
  },
});

connectDB(); // database connection

const PORT = process.env.PORT || 5000;

app.use(cookieParser()); // allow cookie to set or get

app.use(express.json()); // allow json

app.use(cors(corsOptions));

// Preflight response for all routes
app.options("*", cors(corsOptions));

// CHECK SERVER IS RUNNING OR NOT
app.use("/", indexRoute);
app.use("/api", indexRoute);

// USER API
app.use("/api/user", userRoute);

// CHAT API
app.use("/api/chat", chatRoute);

// MESSAGE API
app.use("/api/message", messageRoute);

// ERROR HANDLING API

app.use(notFound); // handle not found route
app.use(error); // handle any other error

// Socket.IO connection start
io.on("connection", (socket) => {
  console.log("connected to socket io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinChat", (room) => {
    socket.join(room); // join room with chatId
    console.log("user join room :", room);
  });

  socket.on("newMessage", (message) => {
    let chat = message?.chat;
    if (!chat?.users) return console.log("chat.users not defined");
    chat?.users?.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.to(user._id).emit("message", message);
    });
  });

  socket.on("typing", (roomId) => {
    console.log(roomId, "typing room");
    socket.to(roomId).emit("typing");
  });

  socket.on("stopTyping", (roomId) => {
    console.log(roomId, "stop typing");
    socket.to(roomId).emit("stopTyping");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // Custom event example
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

// Socket.IO connection end

//  SERVER STARTED

server.listen(PORT, () => {
  console.log("server is running port", PORT);
});
