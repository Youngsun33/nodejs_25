const fruits = ["사과", "수박", "바나나", "오렌지"];

const [first, second] = fruits;
console.log(first, second);

const student = {
  name: "허영선",
  age: 25,
  grade: "B",
};
//객체구조분해할당
const { name, age, grade } = student;
console.log(name, age, grade);
//객체 구조 분해 - 다른 변수 이름으로 할당
const { name: name1, age: age1, grade: grade1 } = student;
console.log(name1, age1, grade1);

const person = {
  name: "홍길동",
};

const { name: personName, age: personAge = 30 } = person;
console.log(personName, personAge);

const printStudentInfo = ({ name, age, grade = "B" }) => {
  console.log(`학생정보`);
  console.log(`-이름: ${name}`);
  console.log(`-나이: ${age}`);
  console.log(`-성적: ${grade}`);
};

printStudentInfo(student); // 객체가 그대로 인자에 들어옴

console.log("--------------");

const book = {
  title: "자바스크립트",
  author: "홍길동",
  publisher: "한빛",
};

const printBook = ({ title, author, publisher }) => {
  console.log(`책정보`);
  console.log(`-책 제목: ${title}`);
  console.log(`-저자: ${author}`);
  console.log(`-출판사: ${publisher}`);
};

printBook(book);

console.log("--------------");

const user = {
  id: 1,
  info: {
    name: "홍길동",
    address: {
      city: "서울",
      street: "강남대로",
    },
  },
};

const {
  id,
  info: {
    name: userName,
    address: { city: cityName, street },
  },
} = user;

console.log(`ID: ${id}`);
console.log(`name: ${userName}`);
console.log(`city: ${cityName}`);
console.log(`street: ${street}`);

console.log("--------------");

const colors = ["빨강", "파랑", "노랑", "초록", "보라"];
const [firstcolor, secondcolor, ...others] = colors; // ... 나머지

console.log(firstcolor, secondcolor, others);

const user1 = { name: "소지섭", age: 45, email: "so@email.com" };
const user2 = { name: "전종서", age: 30 };

const formatUserInfo = ({ name, age, email = "seo@email.com" }) => {
  return `유저정보 \n name: ${name}, age: ${age}, email: ${email}`;
};

console.log(formatUserInfo(user1));
console.log(formatUserInfo(user2));







