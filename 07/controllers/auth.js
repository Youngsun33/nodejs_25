const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  //password 암호화
  const hashenPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    email: email,
    name: name,
    password: hashenPassword,
  });
  res.status(200).json({ message: "ok", data: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await models.User.findOne({
    //이메일로 사용자 있는지 확인
    where: { email: email },
  });
  //사용자가 없음면 잘못된 이메일
  if (!user) {
    return res.status(404).json({ message: "사용자 정보가 없습니다" });
  }

  //사용자 있으면 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    //비밀번호 불일치
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  //정당한ㄴ 사용자 임시허가증 발급
  const accessToken = generateAccessToken(user);
  res.status(200).json({ message: "ok", data: accessToken, user });
};

module.exports = {
  register,
  login,
};
