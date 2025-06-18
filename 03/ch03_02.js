//npm i winston

const winston = require("winston");

const logger = winston.createLogger({
  level: "info", //로깅 레벨이 인포 이상인 것만 출력
  format: winston.format.simple(), //간단한 테스트 형식
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "app.log",
    }),
  ],
});

console.log("-------로그 레벨-------");
console.log("로그 레벨 : error > warn> info > debug > verbose ");

logger.info("정보  - 일반적인 정보메세지를 출력할 때는 인포를 쓰셈");
logger.error("error메세지는 여기에");
logger.warn("주의 메세지는 여기에");
logger.debug("debug- 개발중에만 사용하셈 ");

//쓰는 이유. 개발중에 오류들 확인하려면 하나하나 찍어야 하는데 그러려면 시간이 너무 많이 들어. 그래서 여기서 로거 레벨을 수정해서 개발중일 때 확인해야 할 걸 확인하고 레벨 바꾸고 배포하면 되니까.

console.log("------------");

const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), //시간 추가
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp}, ${level}, ${message}`;
    }) //로그 포맷 변경
  ),
  transports: [new winston.transports.Console()],
});

simpleLogger.info("타임스템프가 추가된 로그");

console.log("------------");
