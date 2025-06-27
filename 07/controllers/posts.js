const models = require("../models");

const createPosts = async (req, res) => {
  const { title, content } = req.body;
  //첨부파일 가져오기
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;

  // let user = await models.User.findOne({
  //   where: { email: "sun@email.com" },
  // });
  // if (!user) {
  //   user = await models.User.create({
  //     name: "sun",
  //     email: "sun@email.com",
  //     password: "dads",
  //   });
  // }

  let attachments = [];
  if (req.file) {
    attachments.push({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } else if (req.files && req.files.length > 0) {
    //멀티플 파일
    attachments = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: req.user.id,
    //fileName: filename,
    attachments: attachments,
  });
  res.status(201).json({ message: "ok", data: post });
};

const getAllPost = async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (post) {
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "ERROR" });
  }
};

const updatePost = async (req, res) => {
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
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "ERROR" });
  }
};

const createComment = async (req, res) => {
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
};

const getCommentAll = async (req, res) => {
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
};

const getCommentById = async (req, res) => {
  const postId = req.params.postId;
  const post = await models.Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ message: "not find posts" });
  }

  const id = req.params.id;
  const comment = await models.Comment.findByPk(id);
  res.status(200).json({ message: "ok", data: comment });
};

const updateComment = async (req, res) => {
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
};

const deleteComment = async (req, res) => {
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
};

module.exports = {
  createPosts,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,

  createComment,
  getCommentAll,
  getCommentById,
  updateComment,
  deleteComment,
};
