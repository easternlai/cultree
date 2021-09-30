const express = require("express");
const authRouter = require("./auth");
const eventRouter = require('./event');

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use('/event', eventRouter);

module.exports = apiRouter;
