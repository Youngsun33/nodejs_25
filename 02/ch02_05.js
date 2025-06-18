const os = require("os");

console.log(`운영체제 :${os.type()}`);
console.log(`플랫폼 : ${os.platform()}`);
console.log(`아키텍쳐 : ${os.arch()}`);
console.log(`호스트명 : ${os.hostname()}`);

//cpu 정보
const cpu = os.cpus();
console.log(`cpu 수 : ${cpu.length}`);
console.log(`cpu 모델 : ${cpu[0].model}`);
console.log(`cpu 속도 : ${cpu[0].speed}`);

//메모리 정보
const totalMemoryGB = os.totalmem() / 1024 / 1024 / 1024;
const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
console.log("\n 메모리 정보");
console.log(`총 메모리: ${totalMemoryGB} GB`);
console.log(`사용 가능 메모리: ${freeMemoryGB.toFixed(2)} GB`); //애플의 경우 cpu랑 같이 써서 메모리 예약해놔서 작게 나오는 듯

//사용자정보 확인
const userInfo = os.userInfo();
console.log("\n 사용자 정보");
console.log(`사용자 이름: ${userInfo.username} `);
console.log(`홈 디렉토리: ${userInfo.homedir} `);
console.log(`쉘: ${userInfo.shell} `);
