const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const sessionFn = (app) => {
  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: "none",
        httpOnly: true,
        maxAge: 60000,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};

module.exports = sessionFn;
