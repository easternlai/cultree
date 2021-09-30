const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes");

const PORT = process.env.PORT || 8080;

app.use(cors());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());

app.use("/api", apiRouter);

(async function () {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to database");
  } catch (err) {
    console.log(err);
  }
})();

const expressServer = app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
