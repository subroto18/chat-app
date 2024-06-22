const express = require("express");
require("dotenv").config();
const data = require("../data/data.js");
const app = express();
const cors = require("cors");
const connectDB = require("./database/index.js");
const userRoute = require("./routes/user.route.js");
const notFound = require("./middlewares/notfound.middleware.js");
const error = require("./middlewares/error.middleware.js");
const cookieParser = require("cookie-parser");

connectDB(); // database connection

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser()); // allow cookie to set or get

app.use(express.json()); // allow json
app.use("/api/user", userRoute);

app.use(notFound); // handle not found route

app.use(error); // handle any other error

// app.get("/", (req, res) => {
//   res.send("welcome to chat app by subroto");
// });

// app.get("/api/chats", (req, res) => {
//   res.json(data);
// });

// app.get("/api/chat/:id", (req, res) => {
//   const id = req.params.id;

//   const chatInfo = data.find((item) => item._id === id);

//   res.send(chatInfo);
// });

app.listen(PORT, () => {
  console.log("server is running port", PORT);
});
