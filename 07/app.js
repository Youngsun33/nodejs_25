const express = require("express");
const path = require("path");
const sawggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const models = require("./models");
const app = express();

const { logger, logging } = require("./middlewares/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use("/downloads", express.static(path.join(__dirname, uploadDir))); //http://localhost:3000/downloads/aa.png
app.use(logging);

//스웨거 설정
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use("/api-docs", sawggerUi.serve, sawggerUi.setup(swaggerDocument));

app.use("/notes", noteRouter);
app.use("/todos", todoRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "요청한 리소스는 찾을 수 없음.",
  });
});

// app.use((err, req, res, next) => {
//   console.log(err.status);
//   res.status(500).json({
//     status: "ERROR",
//     message: `server error : ${err.status}`,
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행중`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});
