"use strict";
//필요하 모듈 임포트
const fs = require("fs"); // 파일시스템 읽으려고
const path = require("path"); //경로 임포트
const Sequelize = require("sequelize"); //씨퀄라이즈
const process = require("process"); //환경 변수 처리
const basename = path.basename(__filename); //index.js 위피한 디렉토리
const env = process.env.NODE_ENV || "development"; //환경 변수에 NODE_ENV development
const config = require(__dirname + "/../config/config.json")[env]; //config
const db = {};

//씨퀄라이즈 객체 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

//파일 읽어요. 현재 파일을 모두 읽는데 확장자가 없거나, js가 아니거나 test.js 로 끝나는 파일이 아니면 다 읽음
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    //읽은 파일 목록을 순회하면서 여기서 작업해줌
    //require('./todo.js')
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

//외래키
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
