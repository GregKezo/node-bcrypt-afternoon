require('dotenv').config()

const express = require('express')
const session = require('express-session')
const massive = require('massive')
const gs = require('gradient-string')
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')
const app = express()

app.use(express.json())

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING).then( db => {
  app.set('db', db);
  console.log(gs.summer('Database is a go!!!'))
})

app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      cookie: ({ maxAge: 1000 * 60 * 5})
    })
)


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)


app.listen(SERVER_PORT, () => console.log(gs.pastel(`Server live on ${SERVER_PORT}`)))