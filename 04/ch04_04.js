const express = require("express");
const app = express();
const PORT = 3000;
const moment = require("moment");
const { Container } = require("winston");

const memos = [
  {
    id: 1,
    title: "오늘 뭐 먹지",
    content: "내일부터 장마 시작 에바야..",
    createdAt: moment().format("YYYY-MM-DD"),
  },
  {
    id: 2,
    title: "운동 계획",
    content: "이번 주말에 등산 가야지.",
    createdAt: moment().format("YYYY-MM-DD"),
  },
  {
    id: 3,
    title: "영화 보기",
    content: "다음 주에 새 영화 개봉한다.",
    createdAt: moment().format("YYYY-MM-DD"),
  },
  {
    id: 4,
    title: "책 읽기",
    content: "읽고 싶었던 책 주문 완료.",
    createdAt: moment().format("YYYY-MM-DD"),
  },
  {
    id: 5,
    title: "친구 만나기",
    content: "오랜만에 친구들과 저녁 약속.",
    createdAt: moment().format("YYYY-MM-DD"),
  },
];

app.use(express.json());

//메모 목록
app.get("/memos", (req, res) => {
  const id = req.params.id;
  res.json(memos);
});

//메모 반환(상세보기. 하나씩)
app.get("/memos/:id", (req, res) => {
  const id = req.params.id;
  const memo = memos.find((m) => m.id === parseInt(id));
  if (!memo) {
    return res.status(404).json({ message: "메모가 없어용 ㅠㅅㅠ" });
  }
  res.status(200).json(memo);
});

//메모 쓰기
app.post("/memos", (req, res) => {
  const { title, content } = req.body;
  const memo = {
    id: memos.length + 1,
    title,
    content,
    createdAt: moment().format("YYYY-MM-DD"),
  };
  memos.push(memo);
  res.status(201).json(memo);
});

//메모 수정
app.put("/memos/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const memo = memos.find((memo) => memo.id === parseInt(id));
  if (!memo) {
    return res.status(404).json({ message: "메모가 없어용 ㅠㅅㅠ" });
  }

  memo.title = title;
  memo.content = content;
  res.json(memo);
});

//메모 삭제
app.delete("/memos/:id", (req, res) => {
  const id = req.params.id;
  const index = memos.findIndex((memo) => memo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "메모가 없어용 ㅠㅅㅠ" });
  }

  memos.splice(index, 1);
  res.status(204).send;
});

//서버 시작

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행중`);
});
