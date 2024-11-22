const jwt = require("jsonwebtoken")

function authorize(req, res, next) {
  const token = req.header("auth-token")
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" })
  }
}

module.exports = authorize
