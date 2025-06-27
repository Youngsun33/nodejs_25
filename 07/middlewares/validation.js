const { registerSchema } = require("../utils/validation");

const validateRegister = (req, res, next) => {
  console.log("-----valiateRegister");
  //registerSchema를 이용해서 입력데이터 검증
  const { error } = registerSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error });
  }
  next(); //미들웨어니ㅏ 컨트롤러로 이동
};

module.exports = { validateRegister };
