const express = require("express");
const authRouter = express.Router();
const { registerTenant, login } = require("../controllers/authController");

authRouter.post("/register", registerTenant);
authRouter.post("/login", login);

module.exports = authRouter;
