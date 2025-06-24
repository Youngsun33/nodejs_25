// 체크리스트

// 테이블
// - 아이디 -> id integer
// - 수량 - > amount integer
// - 체크했는지 안 했는지-> 체크여부 ->  chicken boolean
// -캠핑 준비물=> 그룹핑 -> category text
// -실제 준비해야하는 물건 - > item text

const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "checkLists.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json());

//c퀄라이저는 sql문을 자바문법으로 쓰는거임.
const create_sql = `
    create table if not exists checkLists (
    id integer primary key autoincrement,
    category text ,
    item text ,
    amount integer ,
    checkyn boolean default 0
    );
`;

db.exec(create_sql);

// —> rest api
// Post / checklist
// Get /checklist?category=여름
// Put /checklist/:id -> 체크여부를 toggle 0->1
// Delete checklist/:id
app.post("/checklist", (req, res) => {
  const { category, item, amount } = req.body;
  const result = db
    .prepare(`insert into checklist(category, item, amount) values(?, ?, ?)`)
    .run(category, item, amount);

  const newCheckList = db
    .prepare(`select * from checklist where id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newCheckList });
});
app.get("/checklist", (req, res) => {
  const q = req.query.q;
  const rows = db.prepare(`select * from checklist where category = ?`).all(q);
  res.status(200).json({ message: "ok", data: rows });
});
// check update
app.put("/checklist/:id", (req, res) => {
  const id = req.params.id;
  db.prepare(
    `UPDATE checklist SET checkyn = CASE checkyn WHEN 1 THEN 0 ELSE 1 END WHERE id = ? `
  ).run(id);
  const item = db.prepare(`select * from checklist where id = ? `).get(id);
  res.status(200).json({ message: "ok", data: item });
});

app.delete("/checklist/:id", (req, res) => {
  const id = req.params.id;
  const result = db.prepare(`delete from checklist where id = ?`).run(id);
  if (result.changes == 0) {
    res.status(404).json({ message: "항목을 찾을 수 없어용 " });
  }
  res.status(204).send();
});

app.listen(PORT, () => {});
