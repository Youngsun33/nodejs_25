const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "user.db",
});

//모델정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  //모델로 테이블 생성
  await sequelize.sync({ force: false });

  //데이터 입력
  const user1 = await User.create({
    username: "허영선",
    password: "!q2w3e4r5t",
    email: "heo4021@naver.com",
    birthDate: "2001-03-31",
  });

  console.log(`create user1 => ${JSON.stringify(user1)} `);

  const user2 = await User.create({
    username: "이호수",
    password: "!azsxdcfv    ",
    email: "hosuuu@naver.com",
    birthDate: "1998-04-29",
  });
  console.log(`create user2 => ${JSON.stringify(user2)} `);

  //데이터 전체 검색
  const totalUsers = await User.findAll();
  console.log(`total users => ${JSON.stringify(totalUsers)}`);

  //아이디가 2번인 사람 출력
  console.log(`number2 user => ${JSON.stringify(await User.findByPk(2))}`);

  //아이디가 2번인 사람의 이메일을 jihooni@kakao.com 바꾸고 출력
  await User.update(
    {
      email: "jihooni@kakao.com",
    },
    {
      where: {
        id: 2,
      },
    }
  );

  console.log(`change email => ${JSON.stringify(await User.findByPk(2))}`);

  //아이디가 2번인 사람 삭제 후 2번 출력
  await User.destroy({
    where: {
      id: 2,
    },
  });

  console.log(`delete email => ${JSON.stringify(await User.findByPk(2))}`);
})();
