const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});

// 1.회원모델 만들기 / 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], //사람 이름이 2자부터 5자까지만 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //중복 불가
      validate: {
        isEmail: true,
      },
    },
    password: {
      //단방향 안호화를 해야함
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"), //status를 "active", "inactive" 두 상태로민 있을 수 있게 정의하는게 ENUM
      defaultValue: "active",
    },
  },
  { tableName: "users" }
);

// 2. 게시판 모델 만들기/정의
const Post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  count: { type: DataTypes.INTEGER, defaultValue: 0 },
});

//답변형 게시판 -> 모델추가
const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "comments" }
);

//관계 맺어주기
//{ foreignKey: "authorId" } foreignKey 를 지정 가능함.
User.hasMany(Post, { foreignKey: "authorId" }); //1:N 유저는 많은 포스트를 갖는
Post.belongsTo(User, { foreignKey: "authorId" }); //N:1  유저에게 속한다
//포스트 테이블에 forgien key 로 user 잡힌다.

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

(async () => {
  await sequelize.sync({ force: true });

  //post 테이블에는 1명의 유저 ID가 있다
  //데이터르르 만들어야 함

  //1. 사용자 정보
  const user1 = await User.create({
    username: "허영선",
    email: "heo4021@naver.com",
    password: "!q2w3e4r5t",
    age: 25,
  });

  const user2 = await User.create({
    username: "이호수",
    email: "hosuuu@naver.com",
    password: "!azsxdcfv    ",
    age: 30,
  });

  //2.게시글 정보

  const post1 = await Post.create({
    title: "안녕",
    content: "하세요~~~",
    authorId: user2.id,
  });

  const post2 = await Post.create({
    title: "비야",
    content: "제발 오지 마라",
    authorId: user1.id,
  });

  //comment
  const comment1 = await Comment.create({
    content: "저도요~~",
    userId: user1.id,
    postId: post1.id,
  });

  const comment2 = await Comment.create({
    content: "하이욤~~",
    userId: user1.id,
    postId: post1.id,
  });
  const comment3 = await Comment.create({
    content: "방가방가",
    userId: user1.id,
    postId: post1.id,
  });
  const comment4 = await Comment.create({
    content: "글게요~~",
    userId: user2.id,
    postId: post2.id,
  });

  const posts = await Post.findAll({
    include: [
      {
        model: User,
      },
      {
        model: Comment,
        include: [User],
      },
    ],
  });
  console.log(`posts => ${JSON.stringify(posts)}`);

  const users = await User.findByPk(2, {
    include: [
      {
        model: Post,
      },
    ],
  });
  console.log(`users => ${JSON.stringify(users)}`);
})();
