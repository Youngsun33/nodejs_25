const express = require("express"); //익스프레스 모듈 임포트
const moment = require("moment"); //날짜모듈 임포트
const Database = require("better-sqlite3"); // sqlite 임포트
const path = require("path"); //경로 모듈 임포트
const { off } = require("process");

//DB setting
const db_name = path.join(__dirname, "post.db"); //sqlite용 데이터 베이스 파일 (소용량)
const db = new Database(db_name); //sqlite3의 데이터이스를 생성

//express setting
const app = express(); // 앱이란 변수에 익스프레스 함수를 담음/ 익스프레스 기능 사용
const PORT = 3000; //포트설정
app.use(express.json()); //app.use는 미들웨어 설정. ㄴ모든 요청과 응답에 json 포멧을 사용함.

//1. post.db에 게시판 전용 테이블을 만들기
const create_sql = `
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(100),
    createdAt DATETIME ,
    count INTEGER DEFAULT 0

);
`;

db.exec(create_sql); //데이터베이스 만드는거 실행   //exec는 sql을 실행.

//게시글 입력
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  //createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,은 UTC 시간이라 한국이랑은 9시간 차이가 나기에 이렇게 함수로 한국 시간 저장하고 스템프 찍으려고. insert 할 때 넣는게 가장 좋음
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  let sql = `
        insert into posts(title, content, author, createdAt)
        values(?,?,?,?);
    `;
  const stmt = db.prepare(sql);
  stmt.run(title, content, author, createdAt);
  //stmi.run : updata, insert , delete
  //stmt.all : select * from  table or select * from table where -->[]배열로 값 반환(여러개니까)
  //stmt.get : select * from  table limt 1 --> {}객체로 값 변환

  res.status(201).json({ message: "ok" });
});

//게시글 목록 가져오기
app.get("/posts", (req, res) => {
  //한 페이지에 5개
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  let sql = `select id, title, content, author, createdAt, count
    from posts order by createdAt desc limit ? offset ?; `;

  const stmt = db.prepare(sql);
  const rows = stmt.all(limit, offset);
  console.log(rows);
  res.status(200).json({ data: rows });
});

//게시글 상세 조회
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `select id, title, content, author, createdAt, count
      from posts where id = ?`;

  //조회수
  let ac_sql = `update posts set count = count + 1 where id =? ;`;
  db.prepare(ac_sql).run(id);

  const stmt = db.prepare(sql);
  const post = stmt.get(id); //{}로 반환
  res.status(200).json({ data: post });
});

//게시글 수정
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `update posts set title = ? , content = ?  , createdAt = CURRENT_TIMESTAMP
            where id = ? `;

  const stmi = db.prepare(sql);
  stmi.run(title, content, id);
  //res.redirect("/posts"); //redirec는 목록으로 나옴.게시글 목록 불러오는 저 위에 있는걸 니가 내부적으로 한번 더 호출해. GET http://localhost:3000/posts ->이거 내부적으로 한번 실행할라는 말
  res.json({ message: "ok" });
});

//게시글 삭제
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; //아이디 가져오고
  let sql = `delete from posts where id = ?`; //쿼리문 만들어서
  const stmi = db.prepare(sql); //쿼리문 준비
  stmi.run(id); //실행
  res.json({ message: "ok" });
});

//npx nodemon api.js
app.listen(PORT, () => {});
