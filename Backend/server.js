const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// use cors
const cors = require('cors')
app.use(cors())

// Setup for SocketIo
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)

const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// Use body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Use Cookie-Parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Use Express Middleware
app.use(express.json())

// Use dotenv
require('dotenv').config({path: 'config.env'})

// Database Connection
const connectDB = require('./models/database')
connectDB()


app.listen(PORT, () => {
    console.log(`Server Is Running on PORT ${PORT}`)
})