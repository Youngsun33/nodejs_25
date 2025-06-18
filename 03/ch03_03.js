//날짜 관련

const moment = require("moment");

const nowDate = moment(); // 현재시각
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

console.log(nowDate.format("YYYY/MM/DD"));

//과거 특정날짜의 문자열을 모멘트 객체로 바꿀수 있음
const dateMoment = moment("2024-03-30");
console.log(dateMoment);

// //시간을 추가/빼기
// const nextDays = nowDate.add(7, "days");
// console.log(nextDays);

//시간차ㅣㅇ 계산
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(nowDate, "days");
console.log("과정 종료까지 ", diffDay, "일");

console.log("------문제들------");

const testDate = nowDate.add(100, "days");
console.log("100일 후의 날짜 : ", testDate.format("YYYY년 MM월 DD일"));

const dayStart = moment("2024-03-15");
const dayEnd = moment("2025-09-20");
const dayDiff = dayEnd.diff(dayStart, "months");
console.log("2024-03-15부터 2025-09-20까지", dayDiff, "개월 지남");

const now = moment();
const cristmas = moment("2025-12-25");
const cristmasDiff = cristmas.diff(now, "days");
console.log("크리스마스까지 ", cristmasDiff, "일 남음 ");

console.log("------------------");

require("moment/locale/ko"); // 한국어 로케일 불러오기
moment.locale("ko"); // 한국어로 설정

//요일
const s3 = moment();
console.log(`요일: ${s3.format("d")}`); //3
console.log(`요일: ${s3.format("dd")}`); //we
console.log(`요일: ${s3.format("ddd")}`); //wed
console.log(`요일: ${s3.format("dddd")}`); //wednesday

console.log("------------------");

console.log(
  `${cristmas.format("YYYY-MM-DD")} 크리스마스는 ${cristmas.format(
    "dddd"
  )} 입니다.`
);

const birthday = moment("2001-03-31");
console.log(
  `${birthday.format("YYYY - MM - DD")}는 ${birthday.format("dddd")}입니다. `
);

console.log("------------------");
