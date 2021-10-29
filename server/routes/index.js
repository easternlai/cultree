const express = require("express");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const eventRouter = require('./event');

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/admin', adminRouter)

module.exports = apiRouter;
