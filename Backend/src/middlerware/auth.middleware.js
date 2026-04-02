const jwt = require('jsonwebtoken')

async function authUser (req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({
      message: 'unauthorized'
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

    req.user = decoded

    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}

module.exports = {authUser}