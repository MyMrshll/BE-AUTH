const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const getUser = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes : ['id', 'name', 'email']
    });
    res.json(users);
  } catch (error) {
    console / log(error);
  }
};

const Register = async (req, res) => {
  const { email, name, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password doesn't match" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassowrd = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassowrd,
    });
    res.json({
      msg: "Register Success",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    // console.log(req.body)
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const email = user[0].email;
    const name = user[0].name;
    const accessToken = jsonwebtoken.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1000s",
      }
    );
    
    const refreshToken = jsonwebtoken.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update({
      refresh_token: refreshToken,
    }, {
      where: {
        id: userId
      }
    });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        accessToken,
      });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Email not found" });
  }
};


const logout = async (req, res) => {
  const authHeaderr = req.headers["authorization"];
  res.json(authHeaderr)
  
}
module.exports = { getUser, Register, login, logout };
