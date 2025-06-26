const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  let user = await models.User.findOne({
    where: { email: "sun@email.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "sun",
      email: "sun@email.com",
      password: "dads",
    });
  }
  const post = await models.Post.create({
    title: title,
    content: content,
  });
  res.status(201).json({ message: "ok", data: post });
});

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (post) {
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "ERROR" });
  }
});

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "ERROR" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "ERROR" });
  }
});

//댓글
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ message: "ERROR" });
  }

  let user = await models.User.findOne({
    where: { email: "ds@email.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "dsd",
      email: "ds@email.com",
      password: "sdsad",
    });
  }

  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: user.id,
  });
  res.status(201).json({ message: "ok", data: comment });
});

app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const post = await models.Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ message: "ERROR" });
  }

  const comment = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      {
        model: models.User,
        as: "author",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "ok", data: comment });
});

app.get("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const post = await models.Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ message: "not find posts" });
  }

  const id = req.params.id;
  const comment = await models.Comment.findByPk(id);
  res.status(200).json({ message: "ok", data: comment });
});

//댓글수정
app.put("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "not find posts" });
  }

  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (!comment) {
    return res.status(404).json({ message: "comment not find" });
  }
  if (comment) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "ok", data: comment });
});

//삭제
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const post = await models.Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ message: "post not find" });
  }

  const result = await models.Comment.destroy({
    where: { postId: postId, id: commentId },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "ERROR" });
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
