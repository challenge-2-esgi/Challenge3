const express = require('express')
const cors = require('cors')
const config = require('./config')
const db = require('./db')

// TODO: define cors options
// const corsOptions = {}

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send('challenge')
})

const init = async () => {
    await db.init(config)
    app.listen(config.port, () => {
        console.log(`app listening on port ${config.port}`)
    })
}

init()
process.on('SIGINT', () => {
    db.close()
    process.exit(0)
})
