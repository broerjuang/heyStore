'use strict'

// -----------------------------------------------------------------------------
// NODE MODULES
// -----------------------------------------------------------------------------

// CONFIG
require('dotenv').config()

// Express dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const session = require('express-session');

// Initiate Express
const app = express()
const router = express.Router()

//passport
const passport = require('passport')

//users local
const User = require('./models/model.users')

// Data and modeling
const mongoose = require('mongoose')

//local strategy
const LocalStrategy   = require('passport-local').Strategy;

// -----------------------------------------------------------------------------
// APP MODULES
// -----------------------------------------------------------------------------

const userApi = require('./routes/router.users');
const comment = require('./routes/router.comments')
const album = require('./routes/router.albums')

// -----------------------------------------------------------------------------
// APP CONFIGURATION
// -----------------------------------------------------------------------------
passport.use(new LocalStrategy(User.authenticate()));
// EXPRESS
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// MONGODB
mongoose.Promise = global.Promise // native Node.js promise
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)

// -----------------------------------------------------------------------------
// REGISTER ROUTES
// -----------------------------------------------------------------------------


app.use(session({
  secret : 'whatever',
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 10000000
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', userApi)
app.use('/api', comment)
app.use('/api', album)

// -----------------------------------------------------------------------------
// RUN THE APP
// -----------------------------------------------------------------------------

const host = process.env.HOST || "localhost"
const port = process.env.PORT

app.listen(port, host, (err) => {
  if (err) console.log(err)
  console.log(`Server is running on ${host}:${port}`)
})
