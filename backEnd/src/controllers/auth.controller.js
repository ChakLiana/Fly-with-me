const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const secret = "009dsf993nnsllIIhjew]]qnysahgdj";
function generateAccessToken(nickName) {
  return jwt.sign(nickName, secret, { expiresIn: "1800s" });
}

const signUp = async (req, res) => {
  const {
    email,
    password,
    nickName,
    age,
    weight,
    tel,
    fHours,
    experience,
    role,
    id = uuidv4(),
  } = req.body;
  console.log("REQ BOBY --> ", req.body);
  const token = generateAccessToken({ nickName: req.body.nickName });
  console.log("TOKEN __-->", token);
  if (nickName && password && email && token) {
    try {
      const hashPassword = await bcrypt.hash(password, 11);
      const newUser = await userModel.create({
        nickName,
        password: hashPassword,
        email,
        token,
        age,
        weight,
        tel,
        fHours,
        experience,
        role,
        id,
      });
      console.log("NEW USER _____-->", newUser);

      return res.json({ newUser });
    } catch (error) {
      console.error(error.message);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

const signIn = async (req, res) => {
  const { password, email } = req.body;

  if (password && email) {
    try {
      const currentUser = await userModel.findOne({ email });
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        const token = generateAccessToken({ nickName: currentUser.nickName });
        console.log(token);
        return res.json({ currentUser, token });
      }
      return res.sendStatus(401);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

const signOut = async (req, res) => {
  return res.sendStatus(200);
};

const checkAuth = async (req, res, next) => {
  //   try {
  //     const user = await userModel.findById(req.session.user.id, { password: 0 })
  //     return res.json(user)
  //   } catch (error) {
  //     return res.sendStatus(500)
  //   }
  // }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, secret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    return next();
  });
};

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
};
