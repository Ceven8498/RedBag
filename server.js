// requirements //
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const chmod = require('chmod');
const exphbs = require('express-handlebars');

// establish express as app & port as process.env.PORT or 3001 //
const app = express();
const PORT = process.env.PORT || 3001;

// sets express parameters and directory  //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// don't know if we need this //
const hbs = exphbs.create({});

// create sequelize session //
const sess = {
  secret: process.env.DB_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  timezone: 'utc',
  store: new SequelizeStore({
    db: sequelize
  })
};


// establish handlebars as views //
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');


// tells express what session & routes to use //
app.use(session(sess));
app.use(routes);


// sync sequelize models to the database, then turn on the server //
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
