var createError = require("http-errors");
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRouter = require("./src/routes/authRouter");
const loverRouter = require("./src/routes/loverRouter");
const accountBookRouter = require("./src/routes/accountBookRouter");
const diaryRouter = require("./src/routes/diaryRouter");
const userRouter = require("./src/routes/userRouter");
const commentRouter = require("./src/routes/commentRouter");
const galleryRouter = require("./src/routes/galleryRouter");
const errorHandler = require("./src/middlewares/errorHandler");
const cors = require("cors");

dotenv.config(); //.gitignore 파일의 환경 변수 로드

const app = express();
app.use(cors()); // view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/lover", loverRouter);
app.use("/accountbook", accountBookRouter);
app.use("/diary", diaryRouter);
app.use("/diary", commentRouter);
app.use("/account", userRouter);
app.use("/gallery", galleryRouter);

app.use(errorHandler);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
