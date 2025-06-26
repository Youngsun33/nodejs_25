const express = require("express");
const path = require("path");
const noteRouter = require("./routes/notes");
const models = require("./models");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use("/downloads", express.static(path.join(__dirname, uploadDir))); //http://localhost:3000/downloads/aa.png

app.use("/notes", noteRouter);

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
