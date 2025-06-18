//파일 다루기 fs 모듈

const fs = require("fs"); //= import {'fs'} from react 파일 다루기 모듈 임포트

// fs.writeFileSync("text.txt", "hello, wrold!");
// console.log("파일쓰기완료");

// fs.writeFileSync("hello.txt", "안녕하세요. 제 이름은 허영선입니다.");
//만약 이 파일이 1기가일 경우 11번쨰 코드 출력하는 작업이 안 됨. 처리가 다 될때까지 기다려야 함. 그래서 씽크를 빼고 써야함
// const data = fs.readFileSync("text.txt", "utf-8"); // utf-8 인코딩
// console.log(data);

// console.log(fs.readFileSync("hello.txt", "utf-8"));

// const stats1 = fs.statSync("text.txt");
// console.log(stats1);

//call back 함수 씀
// fs.writeFile("async-text.txt", "Async Hello World!", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("비동기 파일 쓰기 완료 ");
// });

// fs.writeFile(
//   "async-hello.txt",
//   "Async 안녕하세요. 제 이름은 허영선 입니다.",
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//   }
// );

// fs.readFile("async-text.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }

//   console.log("비동기 파일 읽기", data);
// });

// fs.readFile("async-hello.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

//프로미스 방식으로

const fsPromise = require("fs").promises;

const fileOp = async () => {
  try {
    await fsPromise.writeFile("proemise-text.txt", "Promise Hello wrold");
    console.log("파일쓰기완료");

    const data = await fsPromise.readFile("proemise-text.txt", "utf-8");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

fileOp();

const fileOp2 = async () => {
  try {
    await fsPromise.writeFile(
      "promise-hello.txt",
      "안녕하세요. 프로미스 방식으로 파일을 읽는 연습을 하고 있어요"
    );

    const data2 = await fsPromise.readFile("promise-hello.txt", "utf-8");
    console.log(data2);
  } catch (e) {
    console.log(e);
  }
};

fileOp2();
