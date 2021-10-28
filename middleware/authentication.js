const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(402).json({errMsg: "Authentication Invalid"})
  }


  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // ATTACH USER TO JOB ROUTE
    req.user = {userId: payload.userId, name: payload.name}
    next()

  } catch(err) {
    res.status(500).json({errmsg: err})
  }

}

module.exports = auth