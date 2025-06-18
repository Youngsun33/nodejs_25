//express 웹서버 만들기

//익스프레스 모듈 가져오기
const express = require("express");

//익스프레스 애플래케이션 설정
const app = express();

//포트설정
const PORT = 3000;

//라우팅 설정
//app.get GET요청을 처리하는데 http://localhost:3000

app.get("/", (req, res) => {
  //'/'가 uri, req-> http 요청, res-> http 응답
  res.send("hello World");
});

//http://localhost:3000/hello GET
//라우터 추가하면 서버 다시 켜야지 실행됨
app.get("/hello", (req, res) => {
  //'/'가 uri, req-> http 요청, res-> http 응답
  res.send("안녕 /hello 주소에 오신걸~~");
});

//http://localhost:3000/world GET 만들기
app.get("/world", (req, res) => {
  res.send("안녕 /world 주소에 접근하셨습니다.");
});

//서버시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행중`);
});
