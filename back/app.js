var createError = require("http-errors");
const express = require("express");
var path = require("path");
var adaro = require("adaro");
var cookieParser = require("cookie-parser");
const morganMiddleware = require("./src/middlewares/morganMiddleware");
const dotenv = require("dotenv");
const authRouter = require("./src/routes/authRouter");
const loverRouter = require("./src/routes/loverRouter");
const accountbookRouter = require("./src/routes/accountbookRouter");

dotenv.config(); //.env 파일의 환경 변수 로드

const indexRouter = require("./src/routes");
const usersRouter = require("./src/routes/users");

const app = express();

// view engine setup
app.engine("dust", adaro.dust());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "dust");

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/lover", loverRouter);
app.use("/accountbook", accountbookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
