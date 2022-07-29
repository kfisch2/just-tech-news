const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
// .sync()  Sequelize taking the models and connecting them to associated
// database tables

// force: true --> database must sync with the model def. and associations
// sync method = true => tables recreate if any association changes
// AKA DROP TABLE IF EXISTS
// deletes previous data since we don't have a seeding post?
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
});

