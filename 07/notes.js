const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

//POST /notes : 노트 입력

app.post("/notes", async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(200).json({ massege: "ok", data: note });
});

//GET  /notes : 노트 목록조회
app.get("/notes", async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(200).json({ massege: "ok", data: notes });
});

//GET  /notes/:tag : 태그로 노트 목록 조회
app.get("/notes/:tag", async (req, res) => {
  const tag = req.params.tag;
  const note = await models.Note.findAll({ where: { tag: tag } });
  if (note) {
    res.status(200).json({ massege: "ok", data: note });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
});

//PUT  /notes/:id : id 로 노트 수정
app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, tag } = req.body;
  const note = await models.Note.findByPk(id);
  if (note) {
    if (title) note.title = title;
    if (content) note.content = content;
    if (tag) note.tag = tag;
    await note.save();
    res.status(200).json({ massege: "ok", data: note });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
});

//DELETE /notes/:id :id 로 노트 삭제
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Note.destroy({ where: { id: id } });
  if (result > 0) {
    res.status(204).json({ massege: "삭제 성공!" });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
});

app.listen(PORT, () => {
  //데이터베이스 만들기 실행
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
