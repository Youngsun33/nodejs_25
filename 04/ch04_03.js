const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "node js", author: "이지훈" },
  { id: 2, title: "javascript", author: "김철수" },
  { id: 3, title: "express", author: "박영희" },
];

app.use(express.json()); //json으로 가져와서 읽기

app.get("/books", (req, res) => {
  res.json(books);
});

//책 조회
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((b) => b.id === parseInt(id));
  if (!book) {
    return res.status(404).json({ message: "책을 찾을 수 없어용ㅠ_ㅠ " });
  }
  res.json(book); //state 200
});

//추가로 데이터 입력하기
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const book = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(book);
  res.status(201).json(book);
});

//데이터 수정
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;
  const book = books.find((book) => book.id === parseInt(id)); // 어떤 책을 수정할 지 정보 가져옮
  if (!book) {
    return res.status(404).json({ message: "책을 찾을 수 없어용ㅠ_ㅠ " });
  }
  book.title = title;
  book.author = author;
  res.json(book);
});

//데이터 삭제
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "책을 찾을 수 없어용ㅠ_ㅠ " });
  }

  books.splice(index, 1);
  res.status(204).send; // 204-> No Content 요청은 성공했지만 줄 데이터가 없음
});

//서버 열기
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행중`);
});
