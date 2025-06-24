const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "users.db",
});

// 1.회원모델 만들기 / 정의
const User = sequelize.define(
  "Users",
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

(async () => {
  //중복 허용이 불가하니 트루를 값을 줘야함.
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    username: "허영선",
    email: "dsj@email.com",
    password: "shdajkdh",
    age: 39,
  });

  const user2 = await User.create({
    username: "김철수",
    email: "kim@email.com",
    password: "password1",
    age: 28,
  });

  const user3 = await User.create({
    username: "이영희",
    email: "lee@email.com",
    password: "password2",
    age: 22,
  });

  const user4 = await User.create({
    username: "박민수",
    email: "park@email.com",
    password: "password3",
    age: 45,
  });

  const user5 = await User.create({
    username: "최지우",
    email: "choi@email.com",
    password: "password4",
    age: 31,
  });

  const users1 = await User.findAll({
    where: {
      email: {
        [Op.like]: "%email.com",
      },
    },
  });

  console.log(users1.map((u) => u.email));

  const users2 = await User.findAll({
    where: {
      username: {
        [Op.in]: ["최지우", "이영희"],
      },
    },
  });
  console.log(users2.map((u) => u.username));

  const users3 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 30, //lt: less then == '<' /  gt: greater then == '>' / lte : == '<=' / gte '>='
      },
      email: {
        [Op.like]: "kim%",
      },
    },
  });
  console.log(users3.map((u) => u.age));
  console.log(users3.map((u) => u.email));
})();
