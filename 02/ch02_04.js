const Users = [
  { id: 1, name: "홍길동", age: 25, score: 85 },
  { id: 2, name: "김철수", age: 30, score: 90 },
  { id: 3, name: "이영희", age: 22, score: 68 },
  { id: 4, name: "박민수", age: 28, score: 92 },
  { id: 5, name: "최지우", age: 26, score: 87 },
  { id: 6, name: "정수현", age: 24, score: 80 },
  { id: 7, name: "한지민", age: 27, score: 79 },
];

const youngs = Users.filter((user) => {
  //console.log(user);
  return user.age < 25; //리턴 안에는 판별식
});

console.log(youngs); // 리턴 조건에 있는 애들만 배열로 생성

const users1 = Users.filter((user) => {
  return user.score < 80;
});

console.log(users1);

//map

const userName = Users.map((user) => {
  return user.name;
});

console.log(userName);

const userId = Users.map((user) => {
  return { id: user.id, name: user.name };
});

console.log(userId);

console.log("=================");
//필터랑 맵이랑 동시에 쓰기
const person = Users.filter((user) => user.score > 80).map((user) => {
  return { id: user.id, name: user.name, score: user.score };
});

console.log(person);

console.log("=================");

Users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score}입니다`);
});

console.log("=================");

//리듀스 함수
const totalScore = Users.reduce((sum, user) => {
  return sum + user.score;
}, 0);

console.log(totalScore);

console.log("=================");

const totalAge = Users.filter((user) => user.age > 25).reduce((sum, user) => {
  return sum + user.age;
}, 0);
console.log(totalAge);

console.log("=================");

//sort 함수
const sortByAge = [...Users].sort((a, b) => {
  return a.age - b.age;
  //양수이면 a가 B 뒤로가고 음수이면 d면 앞으로 0이면 아무것도 안 함. 오른차순 정렬
});
console.log(sortByAge);

console.log("=================");
