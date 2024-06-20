const express = require("express");
require("dotenv").config();
const data = require("../data/data.js");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("welcome to chat app by subroto");
});

app.get("/api/chats", (req, res) => {
  res.json(data);
});

app.get("/api/chat/:id", (req, res) => {
  const id = req.params.id;

  const chatInfo = data.find((item) => item._id === id);

  res.send(chatInfo);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
