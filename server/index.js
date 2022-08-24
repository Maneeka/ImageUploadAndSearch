require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const cors = require('cors')
const bodyParser = require('body-parser')
const postRoutes = require('./routes/posts.js')



app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postRoutes)

connectDB()

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

//mongoose.set('useFindAndModify', false)
