const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./database/index.js");
const indexRoute = require("./routes/index.route.js");
const userRoute = require("./routes/user.route.js");
const chatRoute = require("./routes/chat.route.js");
const messageRoute = require("./routes/message.route.js");
const notFound = require("./middlewares/notfound.middleware.js");
const error = require("./middlewares/error.middleware.js");
const cookieParser = require("cookie-parser");

connectDB(); // database connection

const PORT = process.env.PORT || 5000;

app.use(cookieParser()); // allow cookie to set or get

app.use(express.json()); // allow json

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
};

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

//  SERVER STARTED
app.listen(PORT, () => {
  console.log("server is running port", PORT);
});
