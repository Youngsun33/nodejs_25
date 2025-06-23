const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "expense.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json());

const create_sql = `
    create table if not exists expenses (
    id integer primary key autoincrement,
    title text not null,
    amount integer not null,
    date text not null,
    memo text
 ) ;
`;

db.exec(create_sql);

//가계부 입력 post
app.post("/expense", (req, res) => {
  const { title, amount, memo } = req.body;
  const date = moment().format("YYYY-MM-DD");
  const sql = `
    insert into expenses(title, amount, memo, date) values (?,?,?,?);
    `;

  const stmt = db.prepare(sql);
  stmt.run(title, amount, memo, date);
  res.status(200).json({ message: "ok" });
});

//가계부 전체목록
app.get("/expense", (req, res) => {
  const sql = `
    select * from expenses;
    `;

  db.prepare(sql).all();
  res.status(201).json(db.prepare(sql).all());
});

//가계부 목록조회- 날짜별로 get / expenses/2025-06-23
app.get("/expense/:date", (req, res) => {
  const date = req.params.date;
  const sql = `
        select * from expenses where date = ?;
        `;

  const rows = db.prepare(sql).all(date);
  res.status(200).json(rows);
});

//가게부 수정 put   id
app.put("/expense/:id", (req, res) => {
  const id = req.params.id;
  const { title, amount, memo } = req.body;
  const sql = `
        update expenses set title = ? , amount = ?, memo = ? where id = ?    
    `;

  db.prepare(sql).run(title, amount, memo, id);
  res.status(200).json({ message: "ok" });
});

//가계부 삭제  delete id
app.delete("/expense/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
        delete from expenses where id = ?; 
    `;

  db.prepare(sql).run(id);
  res.json({ message: "ok" });
});

app.listen(PORT, () => {});
