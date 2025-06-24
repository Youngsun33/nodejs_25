const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

//모델생성
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

//씨퀄라이지는 어씽크 안 에 있음 프로미스로 작업하기에 무조건 어씽크 써야함
//즉시실행하는 함수
(async () => {
  //함수구문은 즉시 실행하는 함수인데 이렇개 하는 이유는 sequelize는 프로미스를 이용해서 작업ㄴ하는데 어싱크/어웨이트를 이용해서 프로미스 작업 할라고
  await sequelize.sync({ force: true });

  const post1 = await Post.create({
    title: "오늘은",
    content: "어깨가 아파용",
    author: "sad",
  });

  console.log(`post1 create => ${JSON.stringify(post1)}`); //json 형식으로 찍어보기

  const post2 = await Post.create({
    title: "오늘 점심",
    content: "기대됩니다",
    author: " 힣",
  });
  console.log(`post1 create => ${JSON.stringify(post2)}`);
})();
