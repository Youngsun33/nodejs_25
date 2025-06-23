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

app.post("/checklists", (req, res) => {
  const { category, item, amount } = req.body;
  let sql = `insert into checkLists(category , item, amount) values(?,?,?)`;

  db.prepare(sql).run(category, item, amount);
  res.status(200).json({ message: "ok" });
});

app.get("/checklists/:category", (req, res) => {
  const category = req.params.category;
  let sql = `select * from checkLists where category = ?`;

  const list = db.prepare(sql).all(category);
  res.status(200).json({ message: "ok", data: list });
});

app.put("/checkLists/:id", (req, res) => {
  const id = req.params.id;
  const toggle = req.params.checkyn;
  let sql = `update checkLists set checkyn = not checkyn where id = ?`;

  db.prepare(sql).run(id);
  res.status(200).json({ message: "ok" });
});

app.delete("/checkLists/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from checkLists where id = ?`;

  db.prepare(sql).run(id);
  res.status(200).json({ message: "ok" });
});

app.listen(PORT, () => {});
