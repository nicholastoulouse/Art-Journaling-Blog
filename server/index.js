require("dotenv").config();
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");
require("./services/passport");

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/oauth", {
  useNewUrlParser: true
});

const app = express();
app.use(
  session({
    secret: "keyboard cat",
    cookie: {}
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
app.use(routes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
