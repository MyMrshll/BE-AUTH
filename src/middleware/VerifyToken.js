const jsonwebtoken = require('jsonwebtoken');
const verifyToken = async(req, res, next) => {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    jsonwebtoken.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) return res.sendStatus(403);
        console.log(decode.email)
        req.email = decode.email;
        next();
    })
}

module.exports = verifyToken