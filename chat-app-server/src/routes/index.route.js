const express = require("express");
const router = express.Router();

// Using router chain for get all type of request in "/" route
router
  .route("/")
  .get((req, res) => {
    res.send("server is running");
  })
  .post((req, res) => {
    res.send("server is running");
  })
  .put((req, res) => {
    res.send("server is running");
  })
  .delete((req, res) => {
    res.send("server is running");
  });

module.exports = router;
