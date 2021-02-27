const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (error) {
    console.log("Something went wrong with the database :(");
    return;
  }
  console.log("Yahoooo! Connected to the database.");
};

connectDB();

const app = express();
const port = process.env.PORT;

// Allow cross-origin
const whitelist = [
  process.env.CLIENT,
  process.env.CMS
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        var message = `Access denied`;
        return callback(message, false);
        // callback(new Error('Not allowed by CORS'));
      }
      // console.log(`Access granted`);
      return callback(null, true);
    },
    credentials: true
  })
);

app.use(cookieParser());

const context = (req, res) => {
  var role = null;

  let token = req.cookies;

  try {
    let a = jwt.verify(token.admin, process.env.JWT);
    role = a.role;
  } catch (e) {}

  // console.log("Role: ", role);

  return { req, res, role };
};

app.use(
  "/",
  graphqlHTTP(async (req, res) => ({
    schema,
    graphiql: false,
    context: context(req, res)
  }))
);

app.listen(port, error => {
  if (error) console.log("Something went wrong with the server port :(");
  else console.log(`Hola! Listening at port ${port}.`);
});
