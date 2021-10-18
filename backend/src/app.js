const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const videoRouter = require("./routers/videoRouter");
const likeRouter = require("./routers/likesRouter");
const morgan = require("morgan");
require("./database");

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routers
app.use("/api/user", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api", likeRouter);

module.exports = app;
