const models = require("../models");
//모델에서 데이터를 조회하거나 수정,추가,삭제 전문하는 함수만 모아둠 //핸들러 함수

//POST /notes : 노트 입력
exports.createAllNotes = async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(200).json({ massege: "ok", data: note });
};

exports.getAllNotes = async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(200).json({ massege: "ok", data: notes });
};

exports.getNotes = async (req, res) => {
  const tag = req.params.tag;
  const note = await models.Note.findAll({ where: { tag: tag } });
  if (note) {
    res.status(200).json({ massege: "ok", data: note });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
};

exports.updateNote = async (req, res) => {
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
};

exports.deleteNotes = async (req, res) => {
  const id = req.params.id;
  const result = await models.Note.destroy({ where: { id: id } });
  if (result > 0) {
    res.status(204).json({ massege: "삭제 성공!" });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
};
