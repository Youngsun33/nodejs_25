//업로드 관련 처리
const multer = require("multer");
const path = require("path");

const uploadDir = `public/uploads`;

//멀터 저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, //이 파일이 있는 디렉토리 하위로 uploadDir을 만들어주세요.
  //파일네임을 유니크하게 만들어주기 위해
  filename: function (req, file, cb) {
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, fname);
  },
});

//미들웨어 생성
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

const uploadSingle = upload.single("file");
const uploadMultiple = upload.array("files", 5); //5개까지 업로드 가능

module.exports = {
  uploadSingle,
  uploadMultiple,
};
