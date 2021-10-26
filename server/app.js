var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*
 ** CORS
 */

const cors = require("cors");
app.use(cors());

/*
 ** routes
 */

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

/*
 ** swagger
 */

const { swaggerUi, specs } = require("./modules/swagger");
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

module.exports = app;
