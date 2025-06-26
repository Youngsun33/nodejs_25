const express = require("express");
const models = require("./models");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
//formdata. multi part forma 데이터를 받기 위해  미들웨워 설정
app.use(express.urlencoded({ extended: true }));

const uploadDir = `public/uploads`;
app.use("/downloads", express.static(path.join(__dirname, uploadDir))); //http://localhost:3000/downloads/aa.png

//멀터 저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, //이 파일이 있는 디렉토리 하위로 uploadDir을 만들어주세요.
  //파일네임을 유니크하게 만들어주기 위해
  filename: function (req, file, cb) {
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, fname);
  },
});

//미들웨어 생성
const upload = multer({ storage: storage });

//1.포스트 요정이 들어오면 먼저 upload.single("file") 미들웨어를 탑니다.
//upload 미들웨어의 역할은 첨부파일을 uploadDir 폴더에 저장하는데 aa-123444.ㅔㅜㅎ 이런 형식
//req 객체에 첨부파일 정보를 실어줌
//2. 우리가 만든 핸들러 함수에서 파일정보를 사용 할 수 있음.
app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content } = req.body;
  //첨부파일 가져오기
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;

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
    fileName: filename,
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

//댓글 삭제
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
