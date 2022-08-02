const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

// cookie storage
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'This is a secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

/* sets up express.js session and connects it to 
Sequelize databse */
app.use(session(sess));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// include frontend files
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// use handlebar
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
// .sync()  Sequelize taking the models and connecting them to associated
// database tables

// sync method = true => tables recreate if any association changes
// AKA DROP TABLE IF EXISTS
// deletes previous data since we don't have a seeding post?
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
});

