const http = require("http");

//req: HTTP 요청, res: HTTP: 응답
const server = http.createServer((req, res) => {
  //요청일 올 때마다 콜백
  //헤더정보 : 브라우저에 응답은 200 성공이고 컨텐트타입은 그냥 텍스트. 셋은 utf-8
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  //본문에 "안녕하세요" 클라이언트에게 전송.
  res.end("안녕하세요 허영선의 첫번째 웹서버에 오셔서 반가워용^0^");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`나만의 웹서버가 http://localhost:${PORT}에서 실행 중 입니다.`);
});
