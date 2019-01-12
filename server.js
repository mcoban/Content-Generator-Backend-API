const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contentObsessive');
let db = mongoose.connection;

app.use(session({
  secret: 'content_obsessive',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let userRoutes = require('./routes/user');
app.use('/user', userRoutes);

let websiteRoutes = require('./routes/website');
app.use('/website', requiresLogin, websiteRoutes);

let googleRoutes = require('./routes/google');
app.use('/google', requiresLogin, googleRoutes);

const articleRoutes = require('./routes/article');
app.use('/article', requiresLogin, articleRoutes);

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.status(401).send('You must be logged in')
  }
}


app.listen(3000);