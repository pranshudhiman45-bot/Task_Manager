const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const taskRouter = require('./routes/task.routes')
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/tasks', taskRouter)
module.exports = app
