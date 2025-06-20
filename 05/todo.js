//모듈
const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");
const { deserialize } = require("v8");

//데베
const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

//서버
const app = express();
const PORT = 3000;
app.use(express.json());

const create_sql = `
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task VARCHAR(255),
        description TEXT,
        completed BOOLEAN DEFAULT 0,
        createdAt DATETIME,
        priority INTEGER DEFAULT 1
        
    );`;

db.exec(create_sql);

//할일 쓰기
app.post("/todos", (req, res) => {
  const { task, description } = req.body;
  const createdAt = moment().format("YYYY-MM-DD hh:mm:ss");
  const sql = `
        insert into todos(task, description, createdAt) values(?,?,?);
    `;
  const stmt = db.prepare(sql);
  stmt.run(task, description, createdAt);
  res.status(201).json({ message: "ok" });
});

//할일 목록 조회
app.get("/todos", (req, res) => {
  let sql = `
        select *  from todos ;
    `;

  const stmt = db.prepare(sql);
  const rows = stmt.all();
  console.log(rows);
  res.status(200).json({ data: rows });
});

//할일 1건 조회
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select * from todos where id = ?;
    `;

  const stmt = db.prepare(sql);
  const todo = stmt.get(id);
  res.status(200).json({ data: todo });
});

//할일 수정

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { task, description } = req.body;
  let sql = `
        update todos set task = ?, description = ?, createdAt = CURRENT_TIMESTAMP where id = ?
    `;

  const stmt = db.prepare(sql);
  stmt.run(task, description, id);
  res.status(200).json({ message: "ok" });
});

//할일 삭제
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        delete from todos where id= ?;
    `;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json({ message: "ok" });
});

//서버열기
app.listen(PORT, () => {});
