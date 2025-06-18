const path = require("path");

const fullpath = path.join(__dirname, "files", "text.txt");
//console.log(`전체경로 : ${fullpath}`);
//__dirname 현재 파일의 디렉토리 절대경로를 찾아옴

///전체경로 : /Users/sun/tutorial/02/files/tasks/jobs/01.txt
const fullpath2 = path.join(__dirname, "files", "tasks", "jobs", "01.txt");
//console.log(`전체경로 : ${fullpath2}`);

// //경로 분리
// const pathParts = path.parse(fullpath);
// console.log(pathParts);

// const pathParts2 = path.parse(fullpath2);
// console.log(pathParts2);

// //확장자 가져올 때
// const ext = path.extname(fullpath);
// console.log(ext);

const fs = require("fs");

const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);
if (!fs.existsSync(dirPath)) {
  //경로가 있으면 t 없으면 f  --! 반대로
  fs.mkdirSync(dirPath);
}

const dirPath2 = path.join(__dirname, "tasks");
if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

const dirPath3 = path.join(__dirname, "tasks", "jobs", "01"); // 경로 만들기
if (!fs.existsSync(dirPath3)) {
  //경로존재여부 체크
  fs.mkdirSync(dirPath3, { recursive: true }); // 실제 디렉토리 생성
}

const filePath = path.join(dirPath3, "text.txt");
fs.writeFileSync(filePath, "디렉토리 생성 후 파일 생성 테스트 ");

//문제2번

const dirPath4 = path.join(__dirname, "main", "src", "code");
if (!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4, { recursive: true });
}

const filePath2 = path.join(dirPath4, "javascript.txt");
fs.writeFileSync(filePath2, "자바스크립트 파일입니다.");

// const test = fs.readFileSync(filePath2, "utf-8");
// console.log(test);

const newDirPath = path.join(__dirname, "rename-dir");
fs.renameSync(dirPath, newDirPath); // 경로 변경 ==> 디렉터리 변경

//디렉토리 삭제
fs.rmdirSync(newDirPath);
