const jwt = require("jsonwebtoken");
const HttpException = require("../utils/http-exception");
const {accessToken} = require("../utils/secret");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // e.g., "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if(!token) throw new HttpException(401, 'Unauthorized');

  const decoded = jwt.verify(token, accessToken);
  if(!decoded) throw new HttpException(401, 'Unauthorized');
  req.user = decoded;
  console.log(req.user);
  next();
};
