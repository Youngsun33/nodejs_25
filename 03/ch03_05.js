//환경변수

//.env 파일을 프로그램 상에 로드
require("dotenv").config();
console.log(`서버포트 : ${process.env.PORT}`);

console.log(`데이터 베이스 : ${process.env.DB_NAME}`);
console.log(`데이터 베이스 user : ${process.env.DB_USER}`);
console.log(`데베 암호 : ${process.env.DB_PASSWORD}`);
console.log(`api 암호 : ${process.env.API_KEY}`);
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);

console.log(`디비 포트: ${process.env.DB_PORT || 5432}`); // 값이 없는 경우 기본값 지정 가능
if (!process.env.OPEN_API_KEY) {
  console.log(`오픈 api의 키가 필요합니다`);
}

//  `isDevelopment` 변수는 현재 애플리케이션의 실행 환경이 개발 환경인지 여부를 나타냅니다.
//  `process.env.NODE_ENV` 값을 확인하여 "development"로 설정된 경우 true를 반환합니다.

//  //@constant {boolean} isDevelopment - 개발 환경 여부를 나타내는 불리언 값

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.log("개발환경에서의 로직 처리");
} else {
  console.log("운영환경에서의 로직 처리");
}
