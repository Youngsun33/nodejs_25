const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>첫번째 마이 홈피</title>
            </head>
            <body>
                <h1>첫번째 홈피</h1>
                <nav> 
                    <a href="/">홈</a> 
                    <a href="/about">소개</a> 
                    <a href="/contact">연락처</a>
                </nav> 
                <p> 익스프레스로 만든 홈피 </p> 
            </body>
        </html>
        `);
});

app.get("/about", (req, res) => {
  res.send(`
            <h1>소개</h1>
            <nav> 
                    <a href="/">홈</a> 
                    <a href="/contact">연락처</a>
                </nav> <p>익스프레스 학습 페이지</p> 
        `);
});

app.get("/contact", (req, res) => {
  res.send(`
            <h1>연락처</h1>
            <nav> 
                    <a href="/">홈</a> 
                    <a href="/about">소개</a> 
                   
                </nav> 
                <p> 이메일 : heo29@email.com </p> 
        `);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server : http://localhost:${PORT}`);
});
