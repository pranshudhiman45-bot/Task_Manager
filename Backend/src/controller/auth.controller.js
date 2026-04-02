const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerUser (req, res) {
  const { username, email, password } = req.body

  const isUserExist = await userModel.findOne({
    $or: [
      {
        username
      },
      {
        email
      }
    ]
  })
  if (isUserExist) {
    return res.status(409).json({
      message: 'User already exist'
    })
  }
  const hash = await bcrypt.hash(password, 10)
  const user = await userModel.create({
    username,
    email,
    password: hash
  })
  const token = jwt.sign(
    {
      id: user._id
    },
    process.env.JWT_SECRET_TOKEN
  )
  res.cookie('token', token)
  res.status(201).json({
    message: 'User register sucessfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

async function loginUser (req, res) {
  const { identifier, password } = req.body
  const user = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }]
  })
  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials'
    })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid credentials'
    })
  }
  const token = jwt.sign(
    {
      id: user._id
    },
    process.env.JWT_SECRET_TOKEN
  )
  res.cookie('token', token, {
    httpOnly: true,
    samesite: 'lax',
    secure: false
  })
  res.status(200).json({
    message: 'User logged in sucessfull',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    //   maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
    }
  })
}
async function logoutUser(req, res) {
    res.clearCookie('token', {
        httpOnly: true,
    sameSite: 'lax',
    secure: false
    })
    res.status(200).json({
    message: 'Logout sucessfully'
  })
}
module.exports = {registerUser, loginUser, logoutUser}