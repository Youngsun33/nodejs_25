//todo

// task 할 일
//description 설명
//completed 완료여부 BOOLEAN
//priority

const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "todos.db",
});

//모델 생성/정의
const Todo = sequelize.define(
  "Todo",
  {
    task: {
      type: DataTypes.STRING,
    },
    discription: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { tableName: "todo" }
);

(async () => {
  await sequelize.sync({ force: false });

  //데이터 2개 입력
  const todo1 = await Todo.create({
    task: "Typescript 공부",
    discription: "진짜 해야함",
  });

  console.log(`todo1 => ${JSON.stringify(todo1)}`);

  const todo2 = await Todo.create({
    task: "방청소",
    discription: "이것도 진짜 해야함",
  });

  console.log(`todo2 => ${JSON.stringify(todo2)}`);

  //전체조회
  console.log(`all => ${JSON.stringify(await Todo.findAll())}`);

  //아이디가 2번인 항목 조회
  console.log(`id number2 => ${JSON.stringify(await Todo.findByPk(2))}`);

  //아이디가 3번인 항목의 completed를 완료로 업뎃
  await Todo.update(
    {
      completed: true,
    },
    { where: { id: 3 } }
  );

  console.log(`update => ${JSON.stringify(await Todo.findByPk(2))}`);

  //아이디가 2번인 항목 삭제
  await Todo.destroy({
    where: { id: 2 },
  });
  console.log(`delete => ${JSON.stringify(await Todo.findByPk(2))}`);
})();
