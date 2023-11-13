const express = require('express')
const cors = require('cors')
const AuthRouter = require('./routes/auth-router')
const ValidationError = require('./errors/ValidationError')
const UserRouter = require('./routes/user-router')

// TODO: define cors options
// const corsOptions = {}

const app = express()
app.use(cors())
app.use(express.json())

app.use(AuthRouter())
app.use(UserRouter())

// errors middleware
app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(422).json(err.errors)
    } else if (err instanceof SyntaxError) {
        res.sendStatus(400)
    } else {
        console.log('[Error] : ' + err)
        res.status(500).send(err.message)
    }
})

module.exports = app
