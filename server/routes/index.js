const express = require("express");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const cartRouter = require("./cart");
const commentRouter = require("./comment");
const eventRouter = require('./event');
const storeRouter = require("./store");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/comment', commentRouter);
apiRouter.use('/store', storeRouter);
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;
