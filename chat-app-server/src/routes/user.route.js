const express = require("express");
const router = express.Router();
const {
  login,
  register,
  searchUserByNameOrEmailExceptLoggedInUser,
  getAllUsers,
  getLoggedInUser,
  logout,
} = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/auth.middleware");
router.post("/login", login);
router.post("/register", register);

// secure route
router.get("/logged-in-user", verifyJWT, getLoggedInUser);
router.get("/all-users", verifyJWT, getAllUsers);
router.get("/search/", verifyJWT, searchUserByNameOrEmailExceptLoggedInUser);
router.post("/logout", verifyJWT, logout);
router.put("/avatar", verifyJWT, logout);
module.exports = router;
