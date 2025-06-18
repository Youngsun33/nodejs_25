const validator = require("validator");

//유효성 검증

const email = "test!email.com";
console.log(`이메일 검증 ${email} 은 ${validator.isEmail(email)}`);

const url = "http://www.naver.com";
console.log(`URL 검증 ${url} 은 ${validator.isURL(url)}`);

const ipAdress = "3.35.152.150";
console.log(`IP 검증 ${ipAdress} 은 ${validator.isIP(ipAdress)}`);

//한국 번호라면 꼭"ko-KR" 넣어주기
const phone = "010-9866-4021";
console.log(
  `phone 검증 ${phone} 은 ${validator.isMobilePhone(phone, "ko-KR")}`
);

const num1 = "1232435";
console.log(`숫자 검증 ${num1} 은 ${validator.isNumeric(num1)}`);

const date1 = "2025-02-23";
console.log(`날짜 검증 ${date1} 은 ${validator.isDate(date1)}`);

//PW
const password = "Heo3@2937";
const v1 = validator.isStrongPassword(password, {
  //비밀번호 8글자 이상, 대문자 1이상, 특수문자 1 이상, 소문자 1이상, 숫자 1이상
  minLength: 8, //최소글자
  minLowercase: 1, //소문자
  minUppercase: 1, //대문자
  minNumbers: 1, //숫자
  minSymbolsL: 1, //특수문자
});
console.log(`비밀번호 검증 ${password} 은 ${v1}`);
