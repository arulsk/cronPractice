const express = require('express')
const  route  = require('./routes/userRoutes')
const {userAuth} = require('./models/userModel')

const app = express()
const port = 5000

userAuth.sync()
app.use(express.json())
app.use('/jwt',route)


app.listen(port,() => console.log(port))