
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const dbConfig = require("./config/database.config")

const mongoose = require('mongoose')

const UserRouter = require('./app/routes/User')


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    // useNewUrlParser: true
}).then(
    () => console.log("Database is connected"),
).catch(
    err =>{ console.log("Could not connect to the database" + err)
    process.exit()
})


app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/user',UserRouter)

const port = 3033
app.get('/', (req, res) => {

   // console.log(req)
    console.log("Someone is trying to access the homepage")
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})