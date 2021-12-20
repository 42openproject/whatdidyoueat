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
var loginRouter = require("./routes/login");
var titlesRouter = require("./routes/titles");
var calendarRouter = require("./routes/calendar");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/login", loginRouter);
app.use("/titles", titlesRouter);
app.use("/calendar", calendarRouter);

/*
 ** swagger
 */

const { swaggerUi, specs } = require("./modules/swagger");
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

/*
 ** sequelize
 */

const models = require("./models/index.js");

models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

module.exports = app;
