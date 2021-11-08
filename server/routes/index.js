const express = require("express");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const commentRouter = require("./comment");
const eventRouter = require('./event');

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/comment', commentRouter);

module.exports = apiRouter;
