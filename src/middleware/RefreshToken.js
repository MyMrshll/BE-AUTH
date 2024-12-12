const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/UserModel');


const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    }) 
    if(!user) return res.sendStatus(403);
    jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
      if (err) return res.sendStatus(403);
      const userId = user[0].id;
      const name = user[0].name;
      const email = user[0].email;
      const accessToken = jsonwebtoken.sign(
        { userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "60s",
        })
        res.json({accessToken });
    })
  }

  module.exports = refreshToken